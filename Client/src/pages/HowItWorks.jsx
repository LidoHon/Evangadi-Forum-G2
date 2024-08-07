import React from 'react';
import classes from "./howitworks.module.css";

const HowItWorks = () => {
	 return (
     <footer className={classes.footer}>
       <div>
         <h2>How It Works</h2>
         <div className={classes.footer_section}>
           <h3>Project Overview</h3>
           <p>
             Welcome to our Student Forum! This platform is designed to
             facilitate knowledge sharing among students. Here, students can ask
             questions, provide answers, and engage in meaningful discussions.
             Our goal is to create a collaborative environment where students
             can learn from each other and enhance their understanding of
             various topics.
           </p>
         </div>

         <div className={classes.footer_section}>
           <h3>Features</h3>
           <ul>
             <li>Browse and search through a list of questions.</li>
             <li>
               Save questions to your personal list for easy access later.
             </li>
             <li>
               Engage with the community by asking and answering questions.
             </li>
             <li>Receive updates as new questions and answers are posted.</li>
           </ul>
         </div>

         <div className={classes.footer_section}>
           <h3>Contribute to Our Project</h3>
           <p>
             We welcome contributions from the community! If you're interested
             in helping us improve this platform, you can access our source code
             on GitHub and submit pull requests with your enhancements.
           </p>
           <a
             href="https://github.com/LidoHon/Evangadi-Forum-G2.git"
             target="_blank"
             rel="noopener noreferrer"
           >
             View on GitHub
           </a>
         </div>

         <div className={classes.footer_section}>
           <h3>Report Bugs and Issues</h3>
           <p>
             If you encounter any bugs or have suggestions for improvement,
             please reach out to us. Your feedback is invaluable in helping us
             enhance the platform.
           </p>
           <p>You can report issues or get in touch with us via email:</p>
           <a href="mailto:support@studentforum.com">
             support@studentforum.com
           </a>
           <br />
           <a href="mailto:developer@studentforum.com">
             developer@studentforum.com
           </a>
         </div>
       </div>
     </footer>
   );
};



export default HowItWorks;
