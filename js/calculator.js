const supabaseUrl = "https://ezixjoupqzlijyocuswx.supabase.co";
const supabaseKey = "sb_publishable_tXBcLSU0KidwZ8ZYFjetTg_FJRbRzXk";
const supabaseClient = supabase.createClient(supabaseUrl, supabaseKey);

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
                callServer(income, expenses, notes); // виклик асинхронної функції  

        });

});            
        // --- асинхронний виклик серверу ---
const supabaseKey = "sb_publishable_tXBcLSU0KidwZ8ZYFjetTg_FJRbRzXk";
async function callServer(income, expenses, notes) {
                try {
                const response = await fetch(
                  "https://ezixjoupqzlijyocuswx.supabase.co/functions/v1/Tax-calculator-function",
                  {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                      "Authorization": `Bearer ${supabaseKey}`,
                      "apikey": supabaseKey
                    },
                    body: JSON.stringify({ income, expenses, notes })
                  }
                );

                if (!response.ok) {
                  throw new Error(`Server error: ${response.status}`);
                 }
            
                const data = await response.json();
                    // Якщо сервер повернув warning (наприклад, expenses > income)
                    if (data.warning) {
                        $("#error").text(data.warning);
                    }
                    // Показуємо результат
                    showResult(data);
                } catch (err) {
                    console.error(err);
                    $("#error").text("Server error. Please try again.");
                }
        }


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


        






