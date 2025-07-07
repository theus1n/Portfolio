
import { useState, useRef, useEffect } from 'react';
import { FaGithub, FaLinkedin} from 'react-icons/fa';
import { FiArrowRight } from 'react-icons/fi';
import './App.css';
import SpotlightCard from './blocks/Components/SpotlightCard/SpotlightCard';


const SOCIALS = [
  { name: 'LinkedIn', url: 'https://www.linkedin.com/in/matheus-wagner-teixeira/', color: '#1da1f2', icon: <FaLinkedin /> },
  { name: 'Github', url: 'https://github.com/theus1n', color: '#1da1f2', icon: <FaGithub /> },
];
const GITHUB = { name: 'GitHub', url: 'https://github.com/theus1n/Portfolio', color: '#333', icon: <FaGithub /> };


function App() {
  const [terminalLines, setTerminalLines] = useState<string[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Prompt string
  const PROMPT = '[theus1n@portfolio]~$';

  // Simulate typing effect for a command, then open the link
  const handleSocialClick = async (social: typeof SOCIALS[number]) => {
    if (isTyping) return; // Prevent overlapping typing
    setIsTyping(true);
    const command = `open ${social.url}`;
    let typed = '';
    setTerminalLines((lines) => [...lines, PROMPT + ' ']);
    for (let i = 0; i < command.length; i++) {
      typed += command[i];
      setTerminalLines((lines) => {
        const newLines = [...lines];
        newLines[newLines.length - 1] = PROMPT + ' ' + typed;
        return newLines;
      });
      await new Promise((res) => setTimeout(res, 30));
    }
    setTimeout(() => {
      window.open(social.url, '_blank', 'noopener,noreferrer');
      setIsTyping(false);
    }, 250);
  };

  // Handle input commands
  // Command history
  const [history, setHistory] = useState<string[]>([]);

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const cmd = input.trim();
      if (!cmd) return;
      setTerminalLines((lines) => [...lines, PROMPT + ' ' + cmd]);
      setHistory((h) => [...h, cmd]);

      const lower = cmd.toLowerCase();
      if (lower === 'clear') {
        setTerminalLines([]);
        setInput('');
        return;
      }
      if (lower === 'help') {
        setTerminalLines((lines) => [
          ...lines,
          'Available commands:',
          'about   Displays who I am?',
          'social    Lists social networks.',
          'email     To send me an email.',
          'history   View command history.',
          'help      Displays this help message.'
        ]);
      } else if (lower === 'about') {
        setTerminalLines((lines) => [
          ...lines,
          'Hi, Im Matheus Wagner Teixeira, born on December 11, 1997. I have been passionate about technology since a young age, building and experimenting with computers long before I knew it would shape my future. I initially pursued a degree in nursing, but over time, my interest in tech evolved into a focused journey toward a career in web development. Today, Im dedicated to growing as a developer and bringing creative, functional solutions to life through code.'
        ]);
      } else if (lower === 'social') {
        setTerminalLines((lines) => [
          ...lines,
          'Social networks:',
          ...SOCIALS.map(s => `${s.name}: ${s.url}`)
        ]);
      } else if (lower === 'email') {
        setTerminalLines((lines) => [
          ...lines,
          'You can email me at: matheus.wgnr.dev@gmail.com'
        ]);
      } else if (lower === 'history') {
        setTerminalLines((lines) => [
          ...lines,
          'Command history:',
          ...history
        ]);
      } else {
        setTerminalLines((lines) => [
          ...lines,
          `Command not found: ${cmd}`
        ]);
      }
      setInput('');
    }
  };

  // Always keep input focused
  useEffect(() => {
    const focusInput = () => {
      inputRef.current?.focus();
    };
    focusInput();
    // Refocus on any click or keydown in the window
    window.addEventListener('mousedown', focusInput);
    window.addEventListener('keydown', focusInput);
    return () => {
      window.removeEventListener('mousedown', focusInput);
      window.removeEventListener('keydown', focusInput);
    };
  }, []);

  // Prevent input from losing focus
  const handleInputBlur = () => {
    inputRef.current?.focus();
  };

  return (
    <div className="terminal-bg">
      <div className="terminal-window">
        <div className="terminal-header">
          <div className="github-header-btn">
            <button
              className="github-circle-btn"
              title="GitHub"
              onClick={() => handleSocialClick(GITHUB)}
              tabIndex={0}
            >
              <FaGithub size={20} />
            </button>
          </div>
          <div className="terminal-title">
            <span>theus1n@dev </span>
          </div>
        </div>
        <div className="terminal-body">
          <div className="terminal-welcome-row">
            <div className="terminal-welcome-text">
              Welcome to my portfolio! Type <b>help</b> for a list of commands
            </div>
            <div className="terminal-social-buttons">
              {SOCIALS.map((social) => (
                <div
                  key={social.name}
                  className="social-row"
                  style={{ color: social.color }}
                  tabIndex={0}
                  title={social.name}
                  role="link"
                  onClick={() => handleSocialClick(social)}
                  onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && handleSocialClick(social)}
                >
                  <span className="social-icon">{social.icon}</span>
                  <span className="social-name">{social.name}</span>
                  <span className="social-arrow"><FiArrowRight /></span>
                  <span
                    className="social-link-url"
                    style={{ cursor: 'pointer', textDecoration: 'underline' }}
                    onClick={e => {
                      e.stopPropagation();
                      handleSocialClick(social);
                    }}
                    onKeyDown={e => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.stopPropagation();
                        handleSocialClick(social);
                      }
                    }}
                    tabIndex={0}
                  >
                    {social.url.replace(/^https?:\/\//, '')}
                  </span>
                </div>
              ))}
            </div>
          </div>
                  <div className="terminal-input-row">
            <span className="terminal-prompt">{PROMPT}</span>
            <input
              className="terminal-input"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleInputKeyDown}
              placeholder=""
              spellCheck={false}
              ref={inputRef}
              onBlur={handleInputBlur}
              autoFocus
              style={{
                width: 'auto',
                flex: 1,
                minWidth: 0,
                border: 'none',
                background: 'transparent',
                color: 'inherit',
                font: 'inherit',
                outline: 'none',
                padding: 0,
                marginLeft: '0.5ch',
                verticalAlign: 'middle',
              }}
            />
          </div>
          {/* Show the last command being typed (if any) directly under the input box, but keep all previous lines above */}
          {terminalLines.length > 1 && terminalLines.slice(0, -1).map((line, idx) => (
            <div key={idx} className="terminal-line">{line}</div>
          ))}
          {terminalLines.length > 0 && (
            <div className="terminal-line" style={{ marginTop: '0.5rem' }}>
              {terminalLines[terminalLines.length - 1]}
            </div>
          )}
          <div className='absolute bottom-18 right-18 zindex-10'>
            <SpotlightCard>
              <div>
                <div>
                  <div>
                    <span>FisioApp</span>
                    <br />
                    A React Native + Expo app <br />
                    for physiotherapy management
                  </div>
                  <a
                    href="https://github.com/theus1n/FisioApp"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View on GitHub
                  </a>
                </div>
              </div>
            </SpotlightCard>
          </div>
        </div>
        </div>
      </div>
  );
}

export default App
