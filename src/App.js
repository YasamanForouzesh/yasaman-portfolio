import React, { useState, useRef, useEffect } from 'react';
import { Mail, Linkedin, Github, Send, X, MessageCircle, Briefcase, GraduationCap, Code, Database, Wrench } from 'lucide-react';

export default function Portfolio() {
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState([
    { type: 'bot', text: 'Hi! 👋 I\'m Yasaman\'s AI assistant. Ask me anything about her experience, skills, or projects!' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [sessionId, setSessionId] = useState(null);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage = inputValue;
    setMessages(prev => [...prev, { type: 'user', text: userMessage }]);
    setInputValue('');
    setIsTyping(true);

    try {
      const requestBody = {
        user_message: userMessage,
        session_id: sessionId || "",
        is_end: false
      };

      const response = await fetch('http://localhost:8000/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();
      
      if (data.session_id) {
        setSessionId(data.session_id);
      }

      const botResponse = data.bot_response || "Sorry, I couldn't process that.";
      
      setMessages(prev => [...prev, { type: 'bot', text: botResponse }]);
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages(prev => [...prev, { 
        type: 'bot', 
        text: 'Sorry, I\'m having trouble connecting right now. Please try again later or reach out via email!' 
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleCloseChat = async () => {
    if (sessionId) {
      try {
        await fetch('http://localhost:8000/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            user_message: "",
            session_id: sessionId,
            is_end: true,
          }),
        });
      } catch (error) {
        console.error('Error ending session:', error);
      }
    }

    setChatOpen(false);
    setSessionId(null);
    setMessages([
      { type: 'bot', text: 'Hi! 👋 I\'m Yasaman\'s AI assistant. Ask me anything about her experience, skills, or projects!' }
    ]);
    setInputValue('');
  };

  return (
    <div className="portfolio">
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
          line-height: 1.6;
          color: #1f2937;
        }

        .portfolio {
          min-height: 100vh;
          background: linear-gradient(135deg, #faf5ff 0%, #eff6ff 50%, #fce7f3 100%);
        }

        .header {
          background: white;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          position: sticky;
          top: 0;
          z-index: 40;
        }

        .nav {
          max-width: 1200px;
          margin: 0 auto;
          padding: 1rem 1.5rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .logo {
          font-size: 1.5rem;
          font-weight: bold;
          background: linear-gradient(to right, #9333ea, #2563eb);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .nav-links {
          display: flex;
          gap: 1.5rem;
        }

        .nav-links a {
          color: #374151;
          text-decoration: none;
          transition: color 0.3s;
        }

        .nav-links a:hover {
          color: #9333ea;
        }

        .hero {
          max-width: 1200px;
          margin: 0 auto;
          padding: 5rem 1.5rem;
          text-align: center;
        }

        .avatar {
          width: 128px;
          height: 128px;
          background: linear-gradient(135deg, #c084fc, #3b82f6);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 2.5rem;
          font-weight: bold;
          margin: 0 auto 1.5rem;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
        }

        .hero-title {
          font-size: 3rem;
          margin-bottom: 1rem;
          color: #111827;
        }

        .hero-subtitle {
          font-size: 1.5rem;
          color: #9333ea;
          margin-bottom: 1.5rem;
          font-weight: 600;
        }

        .hero-description {
          font-size: 1.125rem;
          color: #4b5563;
          max-width: 900px;
          margin: 0 auto 2rem;
          line-height: 1.8;
        }

        .button-group {
          display: flex;
          gap: 1rem;
          justify-content: center;
          flex-wrap: wrap;
        }

        .btn {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1.5rem;
          border-radius: 9999px;
          text-decoration: none;
          font-weight: 500;
          transition: all 0.3s;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }

        .btn-primary {
          background: linear-gradient(to right, #9333ea, #7c3aed);
          color: white;
        }

        .btn-primary:hover {
          background: linear-gradient(to right, #7e22ce, #6d28d9);
          box-shadow: 0 10px 15px rgba(0, 0, 0, 0.2);
          transform: translateY(-2px);
        }

        .btn-secondary {
          background: white;
          color: #9333ea;
          border: 2px solid #e9d5ff;
        }

        .btn-secondary:hover {
          background: #faf5ff;
          transform: translateY(-2px);
        }

        .section, .section-white {
          padding: 4rem 1.5rem;
        }

        .section-white {
          background: white;
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
        }

        .section-title {
          font-size: 2rem;
          text-align: center;
          margin-bottom: 2.5rem;
          color: #1f2937;
          font-weight: bold;
        }

        .skills-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
        }

        .skill-card {
          padding: 1.5rem;
          border-radius: 1rem;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }

        .skill-card-1 {
          background: linear-gradient(135deg, #faf5ff, #eff6ff);
        }

        .skill-card-2 {
          background: linear-gradient(135deg, #eff6ff, #fce7f3);
        }

        .skill-card-3 {
          background: linear-gradient(135deg, #fce7f3, #faf5ff);
        }

        .skill-header {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 1rem;
        }

        .skill-header h3 {
          font-size: 1.25rem;
          color: #1f2937;
          font-weight: 600;
        }

        .skill-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .tag {
          background: white;
          padding: 0.5rem 1rem;
          border-radius: 9999px;
          font-size: 0.875rem;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          color: #374151;
        }

        .experience-card {
          background: white;
          padding: 2rem;
          border-radius: 1rem;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          margin-bottom: 2rem;
          transition: box-shadow 0.3s;
        }

        .experience-card:hover {
          box-shadow: 0 10px 15px rgba(0, 0, 0, 0.15);
        }

        .experience-header {
          display: flex;
          gap: 1rem;
          margin-bottom: 1rem;
          align-items: flex-start;
        }

        .experience-header h3 {
          font-size: 1.5rem;
          margin-bottom: 0.25rem;
          color: #111827;
          font-weight: bold;
        }

        .company {
          font-size: 1.125rem;
          color: #9333ea;
          font-weight: 600;
          margin-bottom: 0.25rem;
        }

        .company-blue {
          color: #2563eb;
        }

        .date {
          color: #6b7280;
          font-size: 0.95rem;
        }

        .experience-list {
          margin-left: 1.5rem;
          color: #4b5563;
        }

        .experience-list li {
          margin-bottom: 0.5rem;
          line-height: 1.6;
        }

        .education-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
        }

        .education-card {
          padding: 1.5rem;
          border-radius: 1rem;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }

        .education-card-1 {
          background: linear-gradient(135deg, #faf5ff, #eff6ff);
        }

        .education-card-2 {
          background: linear-gradient(135deg, #eff6ff, #fce7f3);
        }

        .education-content {
          display: flex;
          gap: 1rem;
          align-items: flex-start;
        }

        .education-content h3 {
          font-size: 1.25rem;
          margin-bottom: 0.5rem;
          color: #111827;
          font-weight: bold;
        }

        .school {
          color: #9333ea;
          font-weight: 600;
          margin-bottom: 0.25rem;
        }

        .school-blue {
          color: #2563eb;
        }

        .description {
          margin-top: 0.5rem;
          color: #4b5563;
          line-height: 1.6;
        }

        .icon-purple {
          color: #9333ea;
        }

        .icon-blue {
          color: #2563eb;
        }

        .icon-pink {
          color: #ec4899;
        }

        .footer {
          background: #111827;
          color: white;
          text-align: center;
          padding: 2rem;
        }

        .footer p {
          color: #9ca3af;
          margin: 0.25rem 0;
        }

        .chat-button {
          position: fixed;
          bottom: 1.5rem;
          right: 1.5rem;
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: linear-gradient(to right, #a855f7, #ec4899);
          color: white;
          border: none;
          cursor: pointer;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s;
          z-index: 50;
        }

        .chat-button:hover {
          transform: scale(1.1);
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.3);
        }

        .chat-window {
          position: fixed;
          bottom: 6rem;
          right: 1.5rem;
          width: 384px;
          height: 500px;
          background: white;
          border-radius: 1rem;
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.3);
          display: flex;
          flex-direction: column;
          z-index: 50;
          overflow: hidden;
        }

        .chat-header {
          background: linear-gradient(to right, #a855f7, #ec4899);
          color: white;
          padding: 1rem;
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .chat-avatar {
          width: 40px;
          height: 40px;
          background: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #a855f7;
        }

        .chat-header h3 {
          font-size: 1rem;
          font-weight: bold;
          margin: 0;
        }

        .chat-header p {
          font-size: 0.75rem;
          opacity: 0.9;
          margin: 0;
        }

        .chat-messages {
          flex: 1;
          overflow-y: auto;
          padding: 1rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .message {
          max-width: 80%;
          padding: 0.75rem;
          border-radius: 1rem;
          word-wrap: break-word;
        }

        .message.bot {
          background: #f3f4f6;
          color: #1f2937;
          border-bottom-left-radius: 0.25rem;
          align-self: flex-start;
        }

        .message.user {
          background: linear-gradient(to right, #a855f7, #ec4899);
          color: white;
          border-bottom-right-radius: 0.25rem;
          align-self: flex-end;
        }

        .typing {
          display: flex;
          gap: 0.25rem;
          padding: 0.75rem;
          background: #f3f4f6;
          border-radius: 1rem;
          border-bottom-left-radius: 0.25rem;
          align-self: flex-start;
          width: fit-content;
        }

        .typing-dot {
          width: 8px;
          height: 8px;
          background: #9ca3af;
          border-radius: 50%;
          animation: bounce 1.4s infinite ease-in-out;
        }

        .typing-dot:nth-child(1) {
          animation-delay: -0.32s;
        }

        .typing-dot:nth-child(2) {
          animation-delay: -0.16s;
        }

        @keyframes bounce {
          0%, 80%, 100% {
            transform: scale(0);
          }
          40% {
            transform: scale(1);
          }
        }

        .chat-input-container {
          padding: 1rem;
          border-top: 1px solid #e5e7eb;
          display: flex;
          gap: 0.5rem;
        }

        .chat-input {
          flex: 1;
          padding: 0.75rem 1rem;
          border: 1px solid #d1d5db;
          border-radius: 9999px;
          outline: none;
          font-size: 0.95rem;
        }

        .chat-input:focus {
          border-color: #a855f7;
          box-shadow: 0 0 0 3px rgba(168, 85, 247, 0.1);
        }

        .send-button {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: linear-gradient(to right, #a855f7, #ec4899);
          color: white;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: box-shadow 0.3s;
        }

        .send-button:hover {
          box-shadow: 0 4px 12px rgba(168, 85, 247, 0.4);
        }

        .close-button {
          margin-left: auto;
          background: transparent;
          border: none;
          color: white;
          cursor: pointer;
          padding: 0.25rem;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .close-button:hover {
          opacity: 0.8;
        }

        @media (max-width: 768px) {
          .hero-title {
            font-size: 2rem;
          }
          
          .nav-links {
            gap: 1rem;
          }
          
          .chat-window {
            width: calc(100vw - 3rem);
            right: 1.5rem;
          }
          
          .skills-grid,
          .education-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      {/* Header */}
      <header className="header">
        <nav className="nav">
          <h1 className="logo">YF</h1>
          <div className="nav-links">
            <a href="#about">About</a>
            <a href="#experience">Experience</a>
            <a href="#skills">Skills</a>
            <a href="#education">Education</a>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section id="about" className="hero">
        <div className="avatar">YF</div>
        <h1 className="hero-title">Yasaman Forouzesh</h1>
        <h2 className="hero-subtitle">Software Engineer</h2>
        <p className="hero-description">
          Backend Software Engineer with 4+ years of experience building production-grade APIs and distributed systems using Golang and PostgreSQL. Skilled in database design, schema migrations, and optimizing performance in high-traffic services. Passionate about learning more about distributed systems and contributing to tools that help founders build and manage their businesses.
        </p>
        <div className="button-group">
          <a href="mailto:yasamanforouzesh93@gmail.com" className="btn btn-primary">
            <Mail size={20} />
            Contact Me
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
            <Linkedin size={20} />
            LinkedIn
          </a>
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
            <Github size={20} />
            GitHub
          </a>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="section-white">
        <div className="container">
          <h2 className="section-title">Skills & Technologies</h2>
          <div className="skills-grid">
            <div className="skill-card skill-card-1">
              <div className="skill-header">
                <Code className="icon-purple" size={24} />
                <h3>Languages</h3>
              </div>
              <div className="skill-tags">
                <span className="tag">Go</span>
                <span className="tag">C++</span>
                <span className="tag">JavaScript</span>
                <span className="tag">Python</span>
              </div>
            </div>
            <div className="skill-card skill-card-2">
              <div className="skill-header">
                <Database className="icon-blue" size={24} />
                <h3>Databases</h3>
              </div>
              <div className="skill-tags">
                <span className="tag">PostgreSQL</span>
                <span className="tag">MongoDB</span>
              </div>
            </div>
            <div className="skill-card skill-card-3">
              <div className="skill-header">
                <Wrench className="icon-pink" size={24} />
                <h3>Tools</h3>
              </div>
              <div className="skill-tags">
                <span className="tag">Docker</span>
                <span className="tag">Kubernetes</span>
                <span className="tag">GitLab</span>
                <span className="tag">Jira</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="section">
        <div className="container">
          <h2 className="section-title">Professional Experience</h2>
          <div className="experience-card">
            <div className="experience-header">
              <Briefcase className="icon-purple" size={24} />
              <div>
                <h3>Back-End Developer</h3>
                <p className="company">DYL | Los Angeles, CA</p>
                <p className="date">October 2021 - Present</p>
              </div>
            </div>
            <ul className="experience-list">
              <li>Engineered and maintained a core PostgreSQL database, improving query performance approximately 30% and ensuring scalability for a CRM application supporting over 10,000 users</li>
              <li>Developed and deployed a Go-based automated worker that streamlines re-billing, freeing up the equivalent of one full-time employee</li>
              <li>Integrated Authorize.net API for secure payment processing, ensuring PCI compliance and reducing fraudulent transaction attempts by 20%</li>
              <li>Developed dynamic SQL queries using Squirrel, enabling flexible and efficient data retrieval and updates for critical reporting features</li>
              <li>Actively participated in peer code review, providing constructive feedback that improved code quality and reduced bugs by an estimated 60%</li>
            </ul>
          </div>

          <div className="experience-card">
            <div className="experience-header">
              <Briefcase className="icon-blue" size={24} />
              <div>
                <h3>Computer Science Tutor</h3>
                <p className="company company-blue">Pierce College | Los Angeles, CA</p>
                <p className="date">October 2019 - December 2020</p>
              </div>
            </div>
            <ul className="experience-list">
              <li>Provided one-on-one tutoring to students in Intro to Computer Science classes</li>
              <li>Assessed current skill level, addressed challenges, and debugged students' C++ programs</li>
              <li>Reviewed difficult concepts utilizing whiteboarding practice and reteaching fundamentals</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="section-white">
        <div className="container">
          <h2 className="section-title">Education</h2>
          <div className="education-grid">
            <div className="education-card education-card-1">
              <div className="education-content">
                <GraduationCap className="icon-purple" size={28} />
                <div>
                  <h3>Software Engineering Immersive</h3>
                  <p className="school">General Assembly</p>
                  <p className="date">December 2020 - March 2021</p>
                  <p className="description">450+ hour intensive program focused on full-stack development, product fundamentals, and team collaboration</p>
                </div>
              </div>
            </div>
            <div className="education-card education-card-2">
              <div className="education-content">
                <GraduationCap className="icon-blue" size={28} />
                <div>
                  <h3>Bachelor's in Computer Science</h3>
                  <p className="school school-blue">Azad University</p>
                  <p className="date">Graduated 2016</p>
                  <p className="description">Tehran, Iran</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>© 2024 Yasaman Forouzesh. All rights reserved.</p>
        <p>Woodland Hills, CA</p>
      </footer>

      {/* Chatbot Button */}
      <button 
        onClick={() => {
          if (chatOpen) {
            handleCloseChat();
          } else {
            setChatOpen(true);
          }
        }} 
        className="chat-button"
      >
        {chatOpen ? <X size={28} /> : <MessageCircle size={28} />}
      </button>

      {/* Chatbot Window */}
      {chatOpen && (
        <div className="chat-window">
          <div className="chat-header">
            <div className="chat-avatar">
              <MessageCircle size={20} />
            </div>
            <div style={{ flex: 1 }}>
              <h3>Chat with AI</h3>
              <p>Ask me about Yasaman</p>
            </div>
            <button onClick={handleCloseChat} className="close-button">
              <X size={24} />
            </button>
          </div>

          <div className="chat-messages">
            {messages.map((msg, idx) => (
              <div key={idx} className={`message ${msg.type}`}>
                {msg.text}
              </div>
            ))}
            {isTyping && (
              <div className="typing">
                <div className="typing-dot"></div>
                <div className="typing-dot"></div>
                <div className="typing-dot"></div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="chat-input-container">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              className="chat-input"
            />
            <button onClick={handleSendMessage} className="send-button">
              <Send size={20} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}