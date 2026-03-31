const { Resend } = require("resend");

exports.handler = async (event) => {
  console.log("Function started");

  try {
    const data = JSON.parse(event.body);
    console.log("Parsed data:", data);

    if (!process.env.RESEND_API_KEY) {
      throw new Error("Missing RESEND_API_KEY");
    }

    console.log("API KEY EXISTS:", !!process.env.RESEND_API_KEY);

    const resend = new Resend(process.env.RESEND_API_KEY);

    const { data: emailData, error } = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: "accivell.info@gmail.com",
      subject: "New Feedback",
      text: `
      Name: ${data.name}
      Email: ${data.email}
      Message: ${data.message}
      `
    });

    if (error) {
      throw new Error(error.message);
    }

    console.log("Email sent:", emailData);

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true })
    };

  } catch (error) {
    console.error("FUNCTION ERROR:", error);

    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};
