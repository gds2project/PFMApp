import React from 'react';

const Faq = () => {
  // Define the style object for the background color
  const containerStyle = {
    backgroundColor: '#F5F5F5', // Light beige color
    padding: '20px', // Add some padding for better appearance
    borderRadius: '8px', // Optional: Rounded corners for a modern look
  };

  return (
    <div className='container' style={containerStyle}>
      <br/>
      <h1>FAQs</h1>
      <br/>
      <p>
        <h3>
          Have questions? Here you'll find the answers to the most commonly asked questions by our users, along with step-by-step instructions and support.
        </h3>
        <br/><br/>
      </p>
      <div className='faqs'>
        <div className='faq'>
          <h4>What is the purpose of this application?</h4>
          <p>This application helps users manage their tasks efficiently with easy-to-use features and intuitive design.</p>
        </div>
        <div className='faq'>
          <h4>Can I update my account details?</h4>
          <p>Yes, you can update your account details by navigating to the "Profile" section in the settings menu. Here you can edit your personal information and save changes.</p>
        </div>
        <div className='faq'>
          <h4>How do I contact support?</h4>
          <p>If you need assistance, you can contact our support team by sending an email to Projectinfoway@gmail.com or by using the contact form on our website.</p>
        </div>
        <div className='faq'>
          <h4>Where can I find the Web Application guide?</h4>
          <p>The user guide is currently not available on our website but it will be added shortly.</p>
        </div>
        <div className='faq'>
          <h4>Is there a mobile version of the application?</h4>
          <p>Yes, our application is designed to be responsive and works well on mobile devices. You can access it through your mobile browser.</p>
        </div>
        <div className='faq'>
          <h4>Are my data and information secure?</h4>
          <p>We take data security very seriously. We are trying to make it protected than what it currently is..!</p>
        </div>
        <div className='faq'>
          <h4>How can I delete my account?</h4>
          <p>If you wish to delete your account, please contact our support team via email at Projectinfoway@gmail.com. They will assist you with the account deletion process.</p>
        </div>
        <div className='faq'>
          <h4>Can I use the application offline?</h4>
          <p>Currently, our application requires an internet connection to function. We are working on features that may support offline use in the future.</p>
        </div>
        <div className='faq'>
          <h4>What should I do if I encounter a bug?</h4>
          <p>If you encounter a bug, please report it to our support team with a detailed description of the issue. This helps us improve the application and address any problems quickly.</p>
        </div>
      </div>
    </div>
  );
}

export default Faq;