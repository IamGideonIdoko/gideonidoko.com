/* eslint-disable @next/next/no-img-element */
import Fade from 'react-reveal/Fade';
import Wobble from 'react-reveal/Wobble';
import styles from '../../styles/Home.module.css';

const SectionTwo = () => {
    const projects = [
        {
            id: 1,
            name: 'LinAssess',
            about: 'Ace that LinkedIn assessment.',
            cover: '/assets/img/linassessdesktopview.jpg',
            coverAlt: 'View of LinAssess',
            codeLink: 'https://github.com/IamGideonIdoko/linassess',
            projectLink: 'https://linassess.netlify.app',
            tech: ['React', 'Node.js', 'Zustand'],
        },
        {
            id: 2,
            name: 'Color Converter',
            about: 'Convert color between 5 models.',
            cover: '/assets/img/colorconverter-cover.png',
            coverAlt: 'View of Color Converter',
            codeLink: 'https://github.com/IamGideonIdoko/colorconverter',
            projectLink: 'https://colorconverter.surge.sh',
            tech: ['HTML', 'CSS', 'JavaScript'],
        },
        {
            id: 3,
            name: 'Cyprobar',
            about: 'Lightweight JS libary for circular progress bars.',
            cover: '/assets/img/cyprobar-cover.png',
            coverAlt: "View of Cyprobar's doc site.",
            codeLink: 'https://github.com/IamGideonIdoko/cyprobar',
            projectLink: 'https://IamGideonIdoko.github.io/cyprobar',
            tech: ['JavaScript', 'Parcel', 'TailwindCSS'],
        },
        {
            id: 4,
            name: 'Sirimazone',
            about: 'Simple online movie store.',
            cover: '/assets/img/sirimazone-cover.png',
            coverAlt: 'View of Sirimazone.',
            codeLink: 'https://github.com/IamGideonIdoko/sirimazone',
            tech: ['SCSS', 'JavaScript', 'PHP', 'MySQL'],
        },
        {
            id: 5,
            name: 'Text to Speech',
            about: 'Convert text to speech.',
            cover: '/assets/img/webtts-cover.png',
            coverAlt: 'View of Text-to-speech app.',
            codeLink: 'https://github.com/IamGideonIdoko/text-to-speech-app',
            projectLink: 'https://webtts.vercel.app',
            tech: ['React'],
        },
        {
            id: 6,
            name: 'ASCL Website',
            about: "ASCL's modern website.",
            cover: '/assets/img/asclhomepage.png',
            coverAlt: 'View of ASCL website.',
            codeLink: 'https://github.com/IamGideonIdoko/ascl-website-frontend',
            projectLink: 'https://ajaokutasteel.com.ng',
            tech: ['React', 'Node.js', 'Express.js', 'MongoDB'],
        },
        {
            id: 7,
            name: 'Dentbud',
            about: 'AI/Mobile-based Smart Personal Assistant for students.',
            cover: '/assets/img/dentbud_mockup.png',
            coverAlt: 'View of Dentbud.',
            codeLink: 'https://github.com/IamGideonIdoko/dentbud',
            projectLink: 'https://dentbud.surge.sh',
            tech: ['React Native', 'Node.js', 'Express.js', 'Python', 'Rasa'],
        },
        {
            id: 8,
            name: 'BAS',
            about: 'Track student attendance using fingerprint biometrics.',
            cover: '/assets/img/bas_mockup.png',
            coverAlt: 'View of BAS.',
            codeLink: 'https://github.com/IamGideonIdoko/bio-attendance-sys',
            projectLink: 'https://github.com/IamGideonIdoko/bio-attendance-sys#screenshots',
            tech: ['React', 'Node.js', 'Express.js', 'Python', 'Flask', 'Computer Vision'],
        },
    ];

    const firstLetter = (str: string) => {
        const newStr = str.split('');
        return newStr[0];
    };

    return (
        <div className={styles.sectionTwo}>
            <div className="container-full">
                <div className={styles.projectsWrapper}>
                    {projects.map((project) => (
                        <div
                            key={project.id}
                            className={`${project.id % 2 === 0 ? styles.projectStyleOne : styles.projectStyleTwo}`}
                        >
                            <Fade bottom duration={2000}>
                                <div
                                    data-first-letter={firstLetter(project.about)}
                                    className={styles.projectSectionOne}
                                >
                                    <div className={styles.nameAboutWrapper}>
                                        <h3>{project.name}</h3>
                                        <p className="project-abt">{project.about}</p>
                                    </div>
                                    <div className={styles.projectExtLinks}>
                                        {project.projectLink && (
                                            <a href={project.projectLink} target="_blank" rel="noopener noreferrer">
                                                View Project <i className="neu-right-lg"></i>
                                            </a>
                                        )}
                                        {project.codeLink && (
                                            <a href={project.codeLink} target="_blank" rel="noopener noreferrer">
                                                View Code <i className="neu-right-lg"></i>
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </Fade>
                            <Fade duration={2000} right={!(project.id % 2 === 0)} left={project.id % 2 === 0}>
                                <div className={styles.projectSectionTwo}>
                                    <div>
                                        <div className={styles.projectTech}>
                                            {project.tech.map((x, idx) => (
                                                <span key={idx}>{x}</span>
                                            ))}
                                        </div>
                                        <img src={project.cover} alt={project.coverAlt} />
                                    </div>
                                </div>
                            </Fade>
                        </div>
                    ))}
                </div>
                <div className={styles.moreProjects}>
                    <Wobble duration={2000}>
                        <div>
                            <a
                                href="https://github.com/IamGideonIdoko"
                                className={`animated-button animated-button--pallene__outline ${styles.aboutSeeMore}`}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                View more projects.
                            </a>
                        </div>
                    </Wobble>
                </div>
            </div>
        </div>
    );
};

export default SectionTwo;
