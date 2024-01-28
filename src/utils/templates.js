export const authTemplate = (otp) => {
  return `
  <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>OTP Verification</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f4f4f4;
      margin: 0;
      padding: 0;
    }

    .container {
      max-width: 600px;
      margin: 20px auto;
      background-color: #fff;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }

    h1 {
      color: #333;
    }

    p {
      color: #666;
    }

    .otp-code {
      font-size: 24px;
      font-weight: bold;
      color: #4285f4;
    }

    .note {
      color: #888;
    }

    .footer {
      margin-top: 20px;
      text-align: center;
    }

    .footer p {
      color: #777;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>OTP Verification</h1>
    <p>Hello ,</p>
    <p>Your One-Time Password (OTP) for verification is:</p>
    <p class="otp-code">${otp}</p>
    <p class="note">Note: This OTP is valid for a short period of time. Do not share it with anyone.</p>
    <div class="footer">
      <p>Thank you for using our service.</p>
    </div>
  </div>
</body>
</html>`
}
