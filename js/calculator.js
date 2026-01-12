
        $(document).ready(function(){
            // Assign a "click" event handler to the button with ID
            $("#calculateBtn").click(function(event){
                // Stop the default browser behavior (preventDafault)
                // This is necessary so that the page does not reload after clicking the button
                // since it usually works as a "submit" for a form
                event.preventDefault(); 

                const income = Number($("#annual-gross-income").val());
                const expenses = Number($("#allowable-expenses").val());
                // which better - write note in this section, or without notes?
                let notes = $("#notes").val(); 
            

                $("#error").text("");

                const validation = validateInputs(income,expenses);

                if (validation.error) {
                    $("#error").text(validation.error);
                    return;
                }

                if (validation.warning) {
                    $("#error").text(validation.warning);
                }



                const result = calculateTaxes(income, expenses, notes);
                showResult(result);
            });

        });


        function validateInputs (income, expenses){
            if (isNaN(income) || isNaN(expenses)){
                return { error: "Please enter valid number for encome and expenses"};
            }

            if (income < 0 || expenses < 0) {
                return { error: "Income and expenses must be positive numbers"};
            }

            if (expenses > income) {
                return {warning: "Expenses exceed income"};
            }

            return {valid: true};
        }

        const personalAllowance = 12570;
        const niLowerLimit = 12570;
        const niUpperLimit = 50270;

        const NI_BASIC_RATE = 0.06;
        const NI_HIGHER_RATE = 0.02;

        const PA_STANDARD = 12570;
        const PA_TAPER_STANDART = 100000;
        const PA_TAPER_END = 125140;

        const IT_BASIC_LIMIT= 50270;
        const IT_ADDITIONAL_LIMIT = 125140;
        const IT_BASIC_RATE = 0.20;
        const IT_HIGHER_RATE = 0.40;
        const IT_ADDITIONAL_RATE = 0.45;


        // function for caunting Personal Allowance with tapering

        function calculatePersonalAllowance(profit) {
            if (profit <= PA_TAPER_STANDART) return PA_STANDARD;
            if (profit >= PA_TAPER_END) return 0;
            const reduction = (profit - PA_TAPER_STANDART) / 2;
            return Math.max(0, PA_STANDARD - reduction);
        }

        // Function Income Tax with breakdown
        function calculateIncomeTax(profit) {
            const personalAllowance = calculatePersonalAllowance(profit);
            let remaining = Math.max (0, profit - personalAllowance);

            const breakdown = {
                zeroRate: {amount : personalAllowance, tax: 0},
                basicRate: {amount: 0, tax: 0},
                higherRate: {amount: 0, tax: 0},
                additionalRate: {amount: 0, tax: 0}
            };

            // Basic rate 20%
            const basicAmount = Math.min(remaining, IT_BASIC_LIMIT - personalAllowance);
            breakdown.basicRate.amount = basicAmount;
            breakdown.basicRate.tax = basicAmount * IT_BASIC_RATE;
            remaining -= basicAmount;

            // Higher rate 40%
            if(remaining > 0){
                const higherAmount = Math.min(remaining, IT_ADDITIONAL_LIMIT - IT_BASIC_LIMIT);
                breakdown.higherRate.amount = higherAmount;
                breakdown.higherRate.tax = higherAmount * IT_HIGHER_RATE;
                remaining -= higherAmount;
            }

            // Additional rate 45%
            if (remaining > 0) {
                breakdown.additionalRate.amount = remaining;
                breakdown.additionalRate.tax = remaining * IT_ADDITIONAL_RATE;
            }

            const total= breakdown.basicRate.tax + breakdown.higherRate.tax + breakdown.additionalRate.tax;

            return {total, breakdown};
        }





        function calculateClass4NI (profit, rateBasic, rateHigher){
            let ni = 0;
            
            if (profit <= niLowerLimit){
                return {
                    total: 0,
                    breakdown: {
                        zeroRate: {amount: profit, tax: 0},
                        basicRate: {amount: 0, tax: 0},
                        higherRate: {amount: 0, tax: 0}
                    }
                };
            }

            // in next part of code I calculate National Insurance basic rate 6% in the range of numbers from 12.570 to 50.270
            // What does the Math.min function do? It takes the lesser of two (I have marked them in brackets)
            // or the entire profit or the upper limit NI 50.270
            // for example, if profit = 30.000 we take 30.000. If profit = 70.000 we take 50.270
            // So, if profit 30.000, we 30.000-12.570=17.430; if profit 70.000, we 50.270-12.570=37.700 (in our case 12.570 it is niLowerLimit)
            // I also wrote Math.max - If profit is below the NI lower limit, NI basic part should be 0. 
            const basicPart = Math.max (0, Math.min (profit, niUpperLimit) - niLowerLimit);
            const niBasicTax = basicPart * rateBasic;
            ni = ni + niBasicTax;
            // we can also write the previous two lines this way, for example:
            // ni = ni + (basicPart * rateBasic);

            // next part code with if - count NI if profit > niUpperLimit. It's tiered taxation:
            // basicPart - it's only the middle range; higherPart - only the amount above the upper threshold. Thay never overlap on the same part
            
            let higherPart = 0;
            let niHigherTax = 0;
            if (profit > niUpperLimit) {
                higherPart = profit - niUpperLimit;
                niHigherTax = higherPart * rateHigher;
                ni += niHigherTax;
            }
            return {
                total: ni,
                breakdown: {
                    zeroRate: {
                        amount: Math.min(profit, niLowerLimit),
                        tax: 0
                    },
                    basicRate: {
                        amount: basicPart,
                        tax: niBasicTax
                    },
                    higherRate: {
                        amount: higherPart,
                        tax: niHigherTax
                    }
                }
            };
        }

        // Main function of calculation
        function calculateTaxes (income, expenses, notes){
            const profit = income - expenses;

            const incomeTaxData = calculateIncomeTax(profit);
            const incomeTax = incomeTaxData.total;

            const niData = calculateClass4NI (profit, NI_BASIC_RATE, NI_HIGHER_RATE);
            const ni = niData.total;

            const netIncome = profit - incomeTax - ni;

            return {
                profit,
                incomeTax,
                incomeTaxBreakdown: incomeTaxData.breakdown,
                ni,
                niBreakdown: niData.breakdown,
                netIncome,
                notes
            };
        }

        // function to determine the effective marginal rate
        // 0% - Personal Allowance
        // 20% Income Tax + 6% NI
        // 40% Income Tax + 2% NI
        // 60% Trap
        // return 47 = 45% Income Tax + 2%NI
        function getEffectiveRate(profit) {
            if (profit <= 12570) return 0; 
            if (profit <= 50270) return 26;
            if (profit <= 100000) return 42;
            if (profit <=125140) {
                // точна маржинальна ставка з taper Personal Allowance
                return 40 + 0.5 * 40 + 2;
            }
            return 47;
        }

        // функція виводу (showeResult)
        function showResult(data){
            $("#result").html(`
                <p>Profit: ${data.profit.toFixed(2)}</p>
                <p>Income Tax: ${data.incomeTax.toFixed(2)}</p>
                    <ul>
                        <li>0%: ${data.incomeTaxBreakdown.zeroRate.tax.toFixed(2)}</li>
                        <li>20%: ${data.incomeTaxBreakdown.basicRate.tax.toFixed(2)}</li>
                        <li>40%: ${data.incomeTaxBreakdown.higherRate.tax.toFixed(2)}</li>
                        <li>45%: ${data.incomeTaxBreakdown.additionalRate.tax.toFixed(2)}</li>
                    </ul>
                <p>National Insurance (total): ${data.ni.toFixed(2)}</p>
                    <ul>
                        <li>0%: ${data.niBreakdown.zeroRate.tax.toFixed(2)}</li>
                        <li>6%: ${data.niBreakdown.basicRate.tax.toFixed(2)}</li>
                        <li>2%: ${data.niBreakdown.higherRate.tax.toFixed(2)}</li>
                    </ul>
                <p>Net Income: ${data.netIncome.toFixed(2)}</p>
                <p>Effective Marginal Rate: ${getEffectiveRate(data.profit)}%</p>
                <p><strong>Notes: <span id="notesOutput"></span></strong></p>
            `);
            $("#notesOutput").text(data.notes);

            // наступний елемент коду для того, щоб текст пояснень chart та таблиці появлявся після обчислення разом з chart. А до обчислення він hidden
                //  Показуємо блок результатів
                const resultsContainer = document.getElementById('resultsContainer');
                if (resultsContainer) resultsContainer.classList.remove('hidden');


                //  Оновлюємо текст описів Pie Chart
                updateText('profitPie', data.profit);
                updateText('incomeTaxPie', data.incomeTax);
                updateText('niAt0Pie', data.niBreakdown.zeroRate.tax);
                updateText('niAt6Pie', data.niBreakdown.basicRate.tax);
                updateText('niAt2Pie', data.niBreakdown.higherRate.tax);
                updateText('netIncomePie', data.netIncome);

                //  Оновлюємо текст описів Bar Chart
                updateText('profitBarChart', data.profit);
                updateText('taxPABarChart', data.incomeTaxBreakdown.zeroRate.tax);
                updateText('taxBasicBarChart', data.incomeTaxBreakdown.basicRate.tax);
                updateText('taxHigherBarChart', data.incomeTaxBreakdown.higherRate.tax);
                updateText('taxAdditionalBarChart', data.incomeTaxBreakdown.additionalRate.tax);
                updateText('ni0BarChart', data.niBreakdown.zeroRate.tax);
                updateText('ni6BarChart', data.niBreakdown.basicRate.tax);
                updateText('ni2BarChart', data.niBreakdown.higherRate.tax);
                updateText('niTotalBarChart', data.ni);
                updateText('netIncomeBarChart', data.netIncome);




            if (typeof window.updatePieChart === "function") {
                window.updatePieChart({
                    "Income Tax": data.incomeTax,
                    "NI 0%": data.niBreakdown.zeroRate.tax,
                    "NI 6%": data.niBreakdown.basicRate.tax,
                    "NI 2%": data.niBreakdown.higherRate.tax,
                    });
                }
                updateBarChart(data);

            if (typeof updateBarChart === "function") updateBarChart(data);
            
            updateTaxTable(data);
        
        }



        // Нова функція для підстановки даних у таблицю
function updateTaxTable(data) {
  // Profit
  document.getElementById('profitAmount').textContent = data.profit.toFixed(2);

  // Income Tax total
  document.getElementById('incomeTaxTotal').textContent = data.incomeTax.toFixed(2);

  // Income Tax Breakdown
  document.getElementById('taxablePA').textContent = data.incomeTaxBreakdown.zeroRate.amount?.toFixed(2) || '0.00';
  document.getElementById('taxPA').textContent = data.incomeTaxBreakdown.zeroRate.tax.toFixed(2);

  document.getElementById('taxableBasic').textContent = data.incomeTaxBreakdown.basicRate.amount?.toFixed(2) || '0.00';
  document.getElementById('taxBasic').textContent = data.incomeTaxBreakdown.basicRate.tax.toFixed(2);

  document.getElementById('taxableHigher').textContent = data.incomeTaxBreakdown.higherRate.amount?.toFixed(2) || '0.00';
  document.getElementById('taxHigher').textContent = data.incomeTaxBreakdown.higherRate.tax.toFixed(2);

  document.getElementById('taxableAdditional').textContent = data.incomeTaxBreakdown.additionalRate.amount?.toFixed(2) || '0.00';
  document.getElementById('taxAdditional').textContent = data.incomeTaxBreakdown.additionalRate.tax.toFixed(2);

  // Class 4 National Insurance total
  document.getElementById('niTotal').textContent = data.ni.toFixed(2);

  // NI Breakdown
  document.getElementById('ni0').textContent = data.niBreakdown.zeroRate.tax.toFixed(2);
  document.getElementById('ni6').textContent = data.niBreakdown.basicRate.tax.toFixed(2);
  document.getElementById('ni2').textContent = data.niBreakdown.higherRate.tax.toFixed(2);

  // Net Income
  document.getElementById('netIncome').textContent = data.netIncome.toFixed(2);

  // Оновлюємо заголовок звіту
  updateReportTitle();
}


/*function exportTaxReportToPDF() {
  updateReportTitle();
  window.print();
}
*/

window.updateReportTitle = function () {
  const input = document.getElementById('reportTitleInput');
  const title = document.getElementById('reportTitle');

  if (!title) return;

  title.textContent =
    input && input.value
      ? input.value
      : 'Tax Report';
};

window.exportTaxReportToPDF = function () {
  window.updateReportTitle();
  window.print();
};


// Універсальна функція для підстановки чисел у span
function updateText(id, value) {
    const el = document.getElementById(id);
    if (el) el.textContent = value.toFixed(2);
}

        