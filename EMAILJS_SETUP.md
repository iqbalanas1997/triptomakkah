# EmailJS Setup Guide

## Overview
The Inquiry Form uses EmailJS to send emails directly from the frontend without a backend server.

## Step 1: Create EmailJS Account
1. Go to https://www.emailjs.com/
2. Sign up for a free account (allows 200 emails/month)

## Step 2: Create Email Service
1. Go to **Email Services** in the dashboard
2. Click **Add New Service**
3. Choose your email provider (Gmail recommended)
4. Follow the setup instructions
5. Copy your **Service ID** (e.g., `service_xxxxx`)

## Step 3: Create Email Template
1. Go to **Email Templates** in the dashboard
2. Click **Create New Template**
3. Set the template name: "Trip To Makkah Inquiry"
4. Set **To Email**: `iqbalanas99.ia@gmail.com`
5. Set **Subject**: `New Inquiry – Trip To Makkah Website`
6. Set **Content** (HTML or plain text):

```
Subject: New Inquiry – Trip To Makkah Website

Name: {{from_name}}
Email: {{from_email}}
Contact Number: {{contact_number}}
Departure Dates: {{departure_dates}}
Number of Nights: {{number_of_nights}}
Interested In: {{interested_in}}
Message:
{{message}}
```

7. Save the template
8. Copy your **Template ID** (e.g., `template_xxxxx`)

## Step 4: Get Public Key
1. Go to **Account** → **General** in the dashboard
2. Copy your **Public Key** (e.g., `xxxxxxxxxxxxx`)

## Step 5: Update Configuration

### Option A: Using Environment Variables (Recommended)
1. Create a `.env` file in the project root
2. Add these variables:

```
VITE_EMAILJS_SERVICE_ID=your_service_id_here
VITE_EMAILJS_TEMPLATE_ID=your_template_id_here
VITE_EMAILJS_PUBLIC_KEY=your_public_key_here
```

3. Restart your development server after creating `.env`

### Option B: Direct Configuration
Open `src/components/ContactForm.jsx` and update these constants:

```javascript
const EMAILJS_SERVICE_ID = 'YOUR_SERVICE_ID';      // Replace with your Service ID
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID';   // Replace with your Template ID
const EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY';      // Replace with your Public Key
```

**Note:** The code will use environment variables if available, otherwise fall back to direct values.

## Step 6: Test the Form
1. Fill out the Inquiry Form on your website
2. Submit the form
3. Check `iqbalanas99.ia@gmail.com` for the email

## Troubleshooting

### Error: "Failed to send message"
**Most Common Cause:** EmailJS credentials not configured

**Solution:**
1. Check browser console (F12 → Console tab) for detailed error
2. Verify you've set up EmailJS credentials:
   - Check if `.env` file exists in project root
   - OR check if constants in `ContactForm.jsx` are updated
3. If using `.env` file:
   - Make sure file is named exactly `.env` (not `.env.txt`)
   - Restart development server after creating/updating `.env`
   - Variables must start with `VITE_` prefix
4. If updating `ContactForm.jsx` directly:
   - Replace `'YOUR_SERVICE_ID'` with your actual Service ID
   - Replace `'YOUR_TEMPLATE_ID'` with your actual Template ID
   - Replace `'YOUR_PUBLIC_KEY'` with your actual Public Key

### Error: "EmailJS is not configured"
- This means credentials are still set to placeholder values
- Follow Step 5 above to configure EmailJS

### Error: "Email service error (Status: XXX)"
- Status 400: Invalid template or service configuration
- Status 401: Invalid Public Key
- Status 404: Service ID or Template ID not found
- Check EmailJS dashboard for detailed logs

### Email not received?
- Check spam folder
- Verify EmailJS service is connected correctly
- Check EmailJS dashboard → Logs for delivery status
- Ensure template variables match exactly (case-sensitive)

### Form submission fails?
- Open browser console (F12) and check for detailed error messages
- Verify all three IDs (Service, Template, Public Key) are correct
- Ensure EmailJS account is active and not suspended
- Check EmailJS dashboard → Logs for error details

### Quick Check:
Open browser console (F12) and look for:
- "EmailJS Error Details:" - This shows what went wrong
- Check if Service ID, Template ID, and Public Key are showing correctly

## EmailJS Free Plan Limits
- 200 emails per month
- Perfect for small to medium websites
- Upgrade to paid plans for more emails

## Support
- EmailJS Documentation: https://www.emailjs.com/docs/
- EmailJS Dashboard: https://dashboard.emailjs.com/

