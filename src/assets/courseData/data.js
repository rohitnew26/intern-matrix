import html from "./images/html.webp";
import css from "./images/fullstack.jpg";
import js from "./images/js.webp";
import react from "./images/react.webp";
import node from "./images/node.webp";
import aws from "./images/aws.webp";
import robotics from "./images/robotic.webp";
import dataanylishs from "./images/dataAnylish.webp";
import python from "./images/download.webp";

import datascience from "./images/datascience.webp";

import systemDesign from "./images/systemDesign.webp";
import generativAi from "./images/Generative.webp";
import ai from "./images/ai.webp";
import DRONE from "./images/drone.webp";
import { data } from "autoprefixer";

export const skillsData = [
  //fronted
  {
    new: true,
    instructor: "John Doe",
    name: "Frontend Development",
    skillId: "r34sfsfs0001",
    level: "Beginner",
    category: "Web Development",
    subtitle: "Learn HTML from Scratch with me",
    desc: "Know how to structure web pages using semantic tags for future builds.",
    link: "https://developer.mozilla.org/en-US/docs/Web/HTML",
    image: html,
    duration: "4 week",
    lessons: 12,
    rating: 4.5,
    ratersCount: 120,
    price: " 1599",
    offerPrice: "799",
    updated: "November 2025",
    content: [
      {
        sectionTitle: "Getting Started",
        lessons: [
          {
            title: "Introduction to HTML",
            videoUrl: "https://example.com/videos/html-intro.mp4",
            order: 1,
          },
          {
            title: "Setting Up Editor",
            videoUrl: "https://example.com/videos/setup-editor.mp4",
            order: 2,
          },
        ],
      },
      {
        sectionTitle: "HTML Basics",
        lessons: [
          {
            title: "Headings and Paragraphs",
            videoUrl: "https://example.com/videos/headings.mp4",
            order: 3,
          },
          {
            title: "Links and Images",
            videoUrl: "https://example.com/videos/links-images.mp4",
            order: 4,
          },
        ],
      },
      {
        sectionTitle: "Forms and Tables",
        lessons: [
          {
            title: "Creating Forms",
            videoUrl: "https://example.com/videos/forms.mp4",
            order: 5,
          },
          {
            title: "Working with Tables",
            videoUrl: "https://example.com/videos/tables.mp4",
            order: 6,
          },
        ],
      },
      {
        sectionTitle: "Final Project",
        lessons: [
          {
            title: "Building a Portfolio Page",
            videoUrl: "https://example.com/videos/project.mp4",
            order: 7,
          },
        ],
      },
    ],
  },

  ,
 {
  instructor: "Rajesh Patel",
  name: "Data Analysis",
  level: "Beginner to Intermediate",
  category: "Data Analysis",
  skillId: "r34sfsfs0002",
  subtitle: "Master Data Analysis using Excel, SQL & Python",
  desc: "Learn data cleaning, visualization, insights generation, and decision-making using Excel, SQL, and Python. Build real-world analytical skills with hands-on projects and industry examples.",
  link: "https://www.kaggle.com/learn",
  image: dataanylishs,
  duration: "5 weeks",
  lessons: 22,
  rating: 4.8,
  ratersCount: 350,
  price: "1599",
  offerPrice: "799",
  updated: "November 2025",
  content: [
    {
      sectionTitle: "Introduction to Data Analysis",
      lessons: [
        {
          title: "What is Data Analysis?",
          contentUrl: "https://www.ibm.com/topics/data-analysis",
          order: 1,
        },
        {
          title: "Types & Process of Data Analysis",
          contentUrl: "https://www.simplilearn.com/data-analysis-process-article",
          order: 2,
        }
      ]
    },

    {
      sectionTitle: "Data Collection & Cleaning",
      lessons: [
        {
          title: "Understanding Data Types & Formats",
          contentUrl: "https://www.geeksforgeeks.org/types-of-data/",
          order: 3,
        },
        {
          title: "Data Cleaning Techniques in Excel",
          contentUrl: "https://support.microsoft.com/en-us/office/clean-data-using-excel-3fda1f8f-9823-4f7f-9a90-8e8a47efefb2",
          order: 4,
        },
        {
          title: "Handling Missing and Duplicate Data",
          contentUrl: "https://www.datacamp.com/tutorial/handling-missing-data",
          order: 5,
        }
      ]
    },

    {
      sectionTitle: "Exploratory Data Analysis (EDA)",
      lessons: [
        {
          title: "Descriptive Statistics",
          contentUrl: "https://www.investopedia.com/terms/d/descriptive_statistics.asp",
          order: 6,
        },
        {
          title: "Data Visualization Basics",
          contentUrl: "https://www.tableau.com/learn/articles/data-visualization",
          order: 7,
        },
        {
          title: "Charts and Dashboards in Excel",
          contentUrl: "https://www.ablebits.com/office-addins-blog/create-dashboard-excel/",
          order: 8,
        }
      ]
    },

    {
      sectionTitle: "SQL for Data Analysis",
      lessons: [
        {
          title: "Introduction to SQL & Databases",
          contentUrl: "https://www.w3schools.com/sql/sql_intro.asp",
          order: 9,
        },
        {
          title: "Querying Data using SELECT",
          contentUrl: "https://www.sqltutorial.org/sql-select/",
          order: 10,
        },
        {
          title: "Filtering, Sorting and Joins",
          contentUrl: "https://www.w3schools.com/sql/sql_join.asp",
          order: 11,
        }
      ]
    },

    {
      sectionTitle: "Python for Data Analysis (Pandas)",
      lessons: [
        {
          title: "Introduction to Python & Jupyter Notebook",
          contentUrl: "https://www.w3schools.com/python/python_intro.asp",
          order: 12,
        },
        {
          title: "DataFrames & Data Manipulation",
          contentUrl: "https://pandas.pydata.org/docs/getting_started/index.html",
          order: 13,
        },
        {
          title: "Creating Visualizations using Matplotlib",
          contentUrl: "https://matplotlib.org/stable/users/explain/quick_start.html",
          order: 14,
        }
      ]
    },

    {
      sectionTitle: "Capstone Project",
      lessons: [
        {
          title: "Analyze Sales Data & Build Dashboard",
          contentUrl: "https://www.kaggle.com/datasets/kyanyoga/sample-sales-data",
          order: 15,
        }
      ]
    }
  ]
},


 {
  instructor: "Rajesh Patel",
  name: "Full Stack Development",
  level: "Beginner to Advanced",
  category: "Web Development",
  skillId: "r34sfsfs0002",
  subtitle: "Become a Full Stack Developer using HTML, CSS, JavaScript, React & Node.js",
  desc: "Learn complete full-stack development starting from frontend fundamentals to backend API development, databases, deployment, and real-world project building.",
  link: "https://roadmap.sh/full-stack",
  image: css,
  duration: "4 Weeks",
  lessons: 42,
  rating: 4.9,
  ratersCount: 20,
  price: "1599",
  offerPrice: "799",
  updated: "November 2025",

  content: [
    {
      sectionTitle: "Introduction to Full Stack Development",
      lessons: [
        {
          title: "What is Full Stack Development?",
          contentUrl: "https://www.freecodecamp.org/news/what-is-a-full-stack-developer/",
          order: 1,
        },
        {
          title: "Frontend vs Backend vs Database",
          contentUrl: "https://www.geeksforgeeks.org/frontend-vs-backend/",
          order: 2,
        }
      ]
    },

    {
      sectionTitle: "HTML Fundamentals",
      lessons: [
        {
          title: "Introduction to HTML",
          contentUrl: "https://www.w3schools.com/html/html_intro.asp",
          order: 3,
        },
        {
          title: "HTML Structure & Semantic Tags",
          contentUrl: "https://developer.mozilla.org/en-US/docs/Glossary/Semantics#semantics_in_html",
          order: 4,
        }
      ]
    },

    {
      sectionTitle: "CSS & Responsive Design",
      lessons: [
        {
          title: "CSS Basics",
          contentUrl: "https://developer.mozilla.org/en-US/docs/Web/CSS",
          order: 5,
        },
        {
          title: "Flexbox & Grid",
          contentUrl: "https://css-tricks.com/snippets/css/a-guide-to-flexbox/",
          order: 6,
        },
        {
          title: "Responsive Design & Media Queries",
          contentUrl: "https://www.w3schools.com/css/css_rwd_mediaqueries.asp",
          order: 7,
        }
      ]
    },

    {
      sectionTitle: "JavaScript Fundamentals",
      lessons: [
        {
          title: "JavaScript Basics",
          contentUrl: "https://javascript.info/intro",
          order: 8,
        },
        {
          title: "Functions & DOM Manipulation",
          contentUrl: "https://www.freecodecamp.org/news/dom-manipulation-in-javascript/",
          order: 9,
        },
        {
          title: "ES6 Concepts",
          contentUrl: "https://www.javascripttutorial.net/es6/",
          order: 10,
        }
      ]
    },

    {
      sectionTitle: "React Frontend Framework",
      lessons: [
        {
          title: "React Basics & Components",
          contentUrl: "https://react.dev/learn",
          order: 11,
        },
        {
          title: "State, Props & Hooks",
          contentUrl: "https://react.dev/learn/state-a-components-memory",
          order: 12,
        },
        {
          title: "React Router",
          contentUrl: "https://reactrouter.com/en/main/start/tutorial",
          order: 13,
        }
      ]
    },

    {
      sectionTitle: "Backend with Node.js and Express",
      lessons: [
        {
          title: "Introduction to Node.js & Express",
          contentUrl: "https://nodejs.org/en/learn",
          order: 14,
        },
        {
          title: "REST API & Routing",
          contentUrl: "https://www.freecodecamp.org/news/rest-api-tutorial-rest-client-rest-service-and-api-calls-explained-with-code-examples/",
          order: 15,
        },
        {
          title: "Authentication & JWT",
          contentUrl: "https://www.freecodecamp.org/news/how-to-get-json-web-token/",
          order: 16,
        }
      ]
    },

    {
      sectionTitle: "Databases & Deployment",
      lessons: [
        {
          title: "MongoDB Basics & CRUD",
          contentUrl: "https://www.mongodb.com/docs/manual/crud/",
          order: 17,
        },
        {
          title: "Connecting Node with MongoDB",
          contentUrl: "https://www.mongodb.com/developer/languages/javascript/node-crud-tutorial/",
          order: 18,
        },
        {
          title: "Deploying Full Stack App",
          contentUrl: "https://vercel.com/docs/deployments/overview",
          order: 19,
        }
      ]
    },

    {
      sectionTitle: "Capstone Project",
      lessons: [
        {
          title: "Build and Deploy Full Stack MERN Project",
          contentUrl: "https://github.com/adrianhajdin/project_mern_memories",
          order: 20,
        }
      ]
    },
  ],
}
,

 {
  instructor: "Rajesh Patel",
  name: "Data Science",
  level: "Beginner to Intermediate",
  category: "Data Science",
  skillId: "r34sfsfs0005",
  subtitle: "Learn Data Science, Statistics, Python, Machine Learning & Real-World Projects",
  desc: "Start your journey into Data Science and learn how to collect, analyze, visualize, and model data using Python, NumPy, Pandas, and Machine Learning techniques with real industry projects.",
  link: "https://www.kaggle.com/learn",
  image: datascience,
  duration: "5 Weeks",
  lessons: 32,
  rating: 4.8,
  ratersCount: 420,
  price: "1899",
  offerPrice: "899",
  updated: "November 2025",

  content: [
    {
      sectionTitle: "Introduction to Data Science",
      lessons: [
        {
          title: "What is Data Science?",
          contentUrl: "https://www.ibm.com/topics/data-science",
          order: 1,
        },
        {
          title: "Data Science Life Cycle & Applications",
          contentUrl: "https://www.geeksforgeeks.org/life-cycle-of-data-science/",
          order: 2,
        }
      ]
    },

    {
      sectionTitle: "Python for Data Science",
      lessons: [
        {
          title: "Python Basics & Setup",
          contentUrl: "https://www.w3schools.com/python/python_intro.asp",
          order: 3,
        },
        {
          title: "Data Structures & Functions",
          contentUrl: "https://realpython.com/python-data-structures/",
          order: 4,
        },
        {
          title: "Working with NumPy",
          contentUrl: "https://numpy.org/doc/stable/user/absolute_beginners.html",
          order: 5,
        },
        {
          title: "Data Analysis with Pandas",
          contentUrl: "https://pandas.pydata.org/docs/getting_started/intro_tutorials/index.html",
          order: 6,
        }
      ]
    },

    {
      sectionTitle: "Data Visualization",
      lessons: [
        {
          title: "Matplotlib & Seaborn Basics",
          contentUrl: "https://www.datacamp.com/tutorial/seaborn-tutorial-python",
          order: 7,
        },
        {
          title: "Building Visual Dashboards",
          contentUrl: "https://www.tableau.com/learn/training",
          order: 8,
        }
      ]
    },

    {
      sectionTitle: "Statistics & Probability",
      lessons: [
        {
          title: "Descriptive Statistics",
          contentUrl: "https://www.investopedia.com/terms/d/descriptive_statistics.asp",
          order: 9,
        },
        {
          title: "Probability & Distribution",
          contentUrl: "https://www.statisticshowto.com/probability-distribution/",
          order: 10,
        },
        {
          title: "Hypothesis Testing",
          contentUrl: "https://www.scribbr.com/statistics/hypothesis-testing/",
          order: 11,
        }
      ]
    },

    {
      sectionTitle: "Machine Learning",
      lessons: [
        {
          title: "Introduction to Machine Learning",
          contentUrl: "https://www.ibm.com/topics/machine-learning",
          order: 12,
        },
        {
          title: "Supervised vs Unsupervised Learning",
          contentUrl: "https://www.javatpoint.com/supervised-vs-unsupervised-learning",
          order: 13,
        },
        {
          title: "Linear Regression Model",
          contentUrl: "https://www.geeksforgeeks.org/linear-regression-using-python/",
          order: 14,
        },
        {
          title: "Classification Models",
          contentUrl: "https://www.sciencedirect.com/topics/computer-science/classification-model",
          order: 15,
        }
      ]
    },

    {
      sectionTitle: "Capstone Project",
      lessons: [
        {
          title: "Real-World Project: Predict Customer Churn",
          contentUrl: "https://www.kaggle.com/datasets/blastchar/telco-customer-churn",
          order: 16,
        }
      ]
    }
  ]
}
,
{
  new: true,
  instructor: "Rajesh Patel",
  name: "JavaScript Developer",
  level: "Intermediate",
  category: "Web Development",
  skillId: "r34sfsfs0003",
  subtitle: "Add Interactivity and Logic to Web Applications",
  desc: "Learn core and advanced JavaScript concepts to make dynamic, interactive, and functional web applications.",
  link: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
  image: js,
  duration: "4 week",
  lessons: 20,
  rating: 4.7,
  ratersCount: 250,
  price: "1499",
  offerPrice: "799",
  updated: "November 2025",

  content: [
    {
      sectionTitle: "JavaScript Basics",
      lessons: [
        {
          title: "What is JavaScript?",
          videoUrl: "https://example.com/videos/js-intro.mp4",
          order: 1,
        },
        {
          title: "Variables and Data Types",
          videoUrl: "https://example.com/videos/js-variables.mp4",
          order: 2,
        },
        {
          title: "Operators and Expressions",
          videoUrl: "https://example.com/videos/js-operators.mp4",
          order: 3,
        },
      ],
    },

    {
      sectionTitle: "Functions and Scope",
      lessons: [
        {
          title: "Functions Explained",
          videoUrl: "https://example.com/videos/js-functions.mp4",
          order: 4,
        },
        {
          title: "Scope & Hoisting",
          videoUrl: "https://example.com/videos/js-scope.mp4",
          order: 5,
        },
      ],
    },

    {
      sectionTitle: "DOM Manipulation",
      lessons: [
        {
          title: "Accessing the DOM",
          videoUrl: "https://example.com/videos/js-dom.mp4",
          order: 6,
        },
        {
          title: "Event Handling",
          videoUrl: "https://example.com/videos/js-events.mp4",
          order: 7,
        },
      ],
    },

    {
      sectionTitle: "ES6 and Modern JavaScript",
      lessons: [
        {
          title: "Arrow Functions & let/const",
          videoUrl: "https://example.com/videos/js-es6.mp4",
          order: 8,
        },
        {
          title: "Destructuring & Spread Operator",
          videoUrl: "https://example.com/videos/js-destructuring.mp4",
          order: 9,
        },
        {
          title: "Modules & Imports",
          videoUrl: "https://example.com/videos/js-modules.mp4",
          order: 10,
        },
      ],
    },

    {
      sectionTitle: "Mini Projects",
      lessons: [
        {
          title: "Build a Calculator",
          videoUrl: "https://example.com/videos/js-calculator.mp4",
          order: 11,
        },
        {
          title: "Interactive Quiz App",
          videoUrl: "https://example.com/videos/js-quiz.mp4",
          order: 12,
        },
      ],
    },
  ],
},

 {
  instructor: "Mithilesh Desai",
  name: "MERN Stack Development",
  level: "Intermediate",
  category: "Web Development",
  skillId: "r34sfsfs0004",
  subtitle: "Build Full-Stack Web Applications Using MongoDB, Express, React & Node.js",
  desc: "Master the skills to build end-to-end web applications using the MERN stack, including authentication, APIs, databases, and deployment.",
  link: "https://react.dev/",
  image: react,
  duration: "4 weeks",
  lessons: 48,
  rating: 4.8,
  ratersCount: 310,
  price: "1299",
  offerPrice: "799",
  updated: "November 2025",

  content: [
    {
      sectionTitle: "Getting Started with React",
      lessons: [
        { title: "Introduction to React & SPA Architecture", videoUrl: "https://example.com/videos/react-intro.mp4", order: 1 },
        { title: "Setting up React Environment & Folder Structure", videoUrl: "https://example.com/videos/react-setup.mp4", order: 2 },
        { title: "JSX and Rendering Elements", videoUrl: "https://example.com/videos/jsx.mp4", order: 3 },
        { title: "Handling Events & Conditional Rendering", videoUrl: "https://example.com/videos/events.mp4", order: 4 }
      ]
    },

    {
      sectionTitle: "Components and Props",
      lessons: [
        { title: "Functional Components & Reusable UI Blocks", videoUrl: "https://example.com/videos/components.mp4", order: 5 },
        { title: "Props, Data Flow & Mapping Lists", videoUrl: "https://example.com/videos/props.mp4", order: 6 },
        { title: "PropTypes & Default Props", videoUrl: "https://example.com/videos/proptypes.mp4", order: 7 }
      ]
    },

    {
      sectionTitle: "State Management & Hooks",
      lessons: [
        { title: "useState Hook", videoUrl: "https://example.com/videos/usestate.mp4", order: 8 },
        { title: "useEffect Hook & API Calls", videoUrl: "https://example.com/videos/useeffect.mp4", order: 9 },
        { title: "Handling Forms & Controlled Components", videoUrl: "https://example.com/videos/forms.mp4", order: 10 },
        { title: "Creating Custom Hooks", videoUrl: "https://example.com/videos/custom-hooks.mp4", order: 11 }
      ]
    },

    {
      sectionTitle: "Routing & Global State",
      lessons: [
        { title: "React Router Setup & Dynamic Routes", videoUrl: "https://example.com/videos/router.mp4", order: 12 },
        { title: "Context API for Global State", videoUrl: "https://example.com/videos/context.mp4", order: 13 },
        { title: "Using Reducers & useReducer Hook", videoUrl: "https://example.com/videos/usereducer.mp4", order: 14 }
      ]
    },

    {
      sectionTitle: "Backend with Node.js & Express",
      lessons: [
        { title: "Node.js & Express Setup", videoUrl: "https://example.com/videos/node.mp4", order: 15 },
        { title: "REST API Fundamentals", videoUrl: "https://example.com/videos/rest.mp4", order: 16 },
        { title: "Routing & Middleware", videoUrl: "https://example.com/videos/middleware.mp4", order: 17 }
      ]
    },

    {
      sectionTitle: "MongoDB Database",
      lessons: [
        { title: "Installing MongoDB & Compass", videoUrl: "https://example.com/videos/mongo-setup.mp4", order: 18 },
        { title: "CRUD Operations & Mongoose Models", videoUrl: "https://example.com/videos/mongoose.mp4", order: 19 },
        { title: "Relationships & Pagination", videoUrl: "https://example.com/videos/pagination.mp4", order: 20 }
      ]
    },

    {
      sectionTitle: "Authentication & JWT",
      lessons: [
        { title: "Register & Login API", videoUrl: "https://example.com/videos/auth.mp4", order: 21 },
        { title: "JWT Token & Protected Routes", videoUrl: "https://example.com/videos/jwt.mp4", order: 22 },
        { title: "Authentication in React", videoUrl: "https://example.com/videos/auth-react.mp4", order: 23 }
      ]
    },

    {
      sectionTitle: "Connecting Frontend & Backend",
      lessons: [
        { title: "Axios Integration with React", videoUrl: "https://example.com/videos/axios.mp4", order: 24 },
        { title: "Calling Protected APIs & Error Handling", videoUrl: "https://example.com/videos/errors.mp4", order: 25 }
      ]
    },

    {
      sectionTitle: "Project Work",
      lessons: [
        { title: "Building Full-Stack Todo App", videoUrl: "https://example.com/videos/todo.mp4", order: 26 },
        { title: "User Authentication System", videoUrl: "https://example.com/videos/authproject.mp4", order: 27 },
        { title: "Portfolio Website (React + Node + MongoDB)", videoUrl: "https://example.com/videos/portfolio.mp4", order: 28 }
      ]
    },

    {
      sectionTitle: "Deployment",
      lessons: [
        { title: "Deploy Backend on Render", videoUrl: "https://example.com/videos/render.mp4", order: 29 },
        { title: "Deploy Frontend on Vercel", videoUrl: "https://example.com/videos/vercel.mp4", order: 30 }
      ]
    }
  ]
} ,
{
  instructor: "John Doe",
  name: "GENERATIVE AI WITH SPRING BOOT",
  level: "Advanced",
  category: "Backend Development",
  skillId: "r34sfsfs0005",
  subtitle: "Develop Scalable and Intelligent Backend Systems with Spring Boot & AI",
  desc: "Master Spring Boot to build production-grade REST APIs, integrate AI models, develop microservices, secure applications with JWT, and deploy to cloud environments.",
  link: "https://spring.io/projects/spring-boot",
  image: generativAi,
  duration: "5 weeks",
  lessons: 55,
  rating: 4.9,
  ratersCount: 280,
  price: "1999",
  offerPrice: "899",
  updated: "December 2025",

  content: [
    {
      sectionTitle: "Introduction to Spring Boot",
      lessons: [
        { title: "What is Spring Boot? Architecture & Use Cases", videoUrl: "https://example.com/videos/spring-intro.mp4", order: 1 },
        { title: "Spring Boot Setup and First Application", videoUrl: "https://example.com/videos/setup.mp4", order: 2 },
        { title: "Project Structure & Running the Application", videoUrl: "https://example.com/videos/structure.mp4", order: 3 },
        { title: "Dependency Management with Maven & Gradle", videoUrl: "https://example.com/videos/dependencies.mp4", order: 4 }
      ]
    },

    {
      sectionTitle: "REST API Development",
      lessons: [
        { title: "Creating REST Controllers", videoUrl: "https://example.com/videos/controllers.mp4", order: 5 },
        { title: "Request Mapping, DTOs & Validation", videoUrl: "https://example.com/videos/validation.mp4", order: 6 },
        { title: "Service and Repository Layers Explained", videoUrl: "https://example.com/videos/layers.mp4", order: 7 },
        { title: "Error Handling & Response Entities", videoUrl: "https://example.com/videos/errors.mp4", order: 8 }
      ]
    },

    {
      sectionTitle: "Database & JPA",
      lessons: [
        { title: "Connecting to MySQL", videoUrl: "https://example.com/videos/mysql.mp4", order: 9 },
        { title: "Spring Data JPA Basics", videoUrl: "https://example.com/videos/jpa.mp4", order: 10 },
        { title: "CRUD Operations & Entity Relationships", videoUrl: "https://example.com/videos/crud.mp4", order: 11 },
        { title: "Pagination & Sorting", videoUrl: "https://example.com/videos/pagination.mp4", order: 12 }
      ]
    },

    {
      sectionTitle: "Integrating Generative AI",
      lessons: [
        { title: "Introduction to Generative AI & LLMs", videoUrl: "https://example.com/videos/ai-intro.mp4", order: 13 },
        { title: "Calling OpenAI / Gemini / LLaMA APIs from Spring Boot", videoUrl: "https://example.com/videos/openai.mp4", order: 14 },
        { title: "Building AI-Driven Text Generation Endpoint", videoUrl: "https://example.com/videos/gen-endpoint.mp4", order: 15 },
        { title: "Real-Time Chatbot API Integration", videoUrl: "https://example.com/videos/chatbot.mp4", order: 16 }
      ]
    },

    {
      sectionTitle: "Security & Authentication",
      lessons: [
        { title: "Spring Security Fundamentals", videoUrl: "https://example.com/videos/security.mp4", order: 17 },
        { title: "JWT Authentication with Refresh Token", videoUrl: "https://example.com/videos/jwt.mp4", order: 18 },
        { title: "Role-Based Authorization", videoUrl: "https://example.com/videos/roles.mp4", order: 19 }
      ]
    },

    {
      sectionTitle: "Microservices & Messaging",
      lessons: [
        { title: "Introduction to Microservices Architecture", videoUrl: "https://example.com/videos/microservices.mp4", order: 20 },
        { title: "Service Discovery with Eureka", videoUrl: "https://example.com/videos/eureka.mp4", order: 21 },
        { title: "API Gateway with Spring Cloud", videoUrl: "https://example.com/videos/gateway.mp4", order: 22 },
        { title: "Kafka & Messaging Basics", videoUrl: "https://example.com/videos/kafka.mp4", order: 23 }
      ]
    },

    {
      sectionTitle: "Testing & Documentation",
      lessons: [
        { title: "JUnit & Mockito Testing", videoUrl: "https://example.com/videos/testing.mp4", order: 24 },
        { title: "Swagger OpenAPI Documentation", videoUrl: "https://example.com/videos/swagger.mp4", order: 25 }
      ]
    },

    {
      sectionTitle: "Docker & Deployment",
      lessons: [
        { title: "Dockerizing a Spring Boot Application", videoUrl: "https://example.com/videos/docker.mp4", order: 26 },
        { title: "CI/CD Deployment Pipeline", videoUrl: "https://example.com/videos/cicd.mp4", order: 27 },
        { title: "Deploying to AWS / Render / Railway", videoUrl: "https://example.com/videos/deploy.mp4", order: 28 }
      ]
    },

    {
      sectionTitle: "Capstone Project",
      lessons: [
        { title: "Build AI-Powered Employee Management System", videoUrl: "https://example.com/videos/project.mp4", order: 29 },
        { title: "Project Presentation & Portfolio Upload", videoUrl: "https://example.com/videos/portfolio.mp4", order: 30 }
      ]
    }
  ]
}
,
 {
  instructor: "John Doe",
  name: "GENERATIVE AI WITH SPRING BOOT",
  level: "Advanced",
  category: "Backend Development",
  skillId: "r34sfsfs0005",
  subtitle: "Develop Scalable and Intelligent Backend Systems with Spring Boot & AI",
  desc: "Master Spring Boot to build production-grade REST APIs, integrate AI models, develop microservices, secure applications with JWT, and deploy to cloud environments.",
  link: "https://spring.io/projects/spring-boot",
  image: generativAi,
  duration: "4 weeks",
  lessons: 55,
  rating: 4.9,
  ratersCount: 20,
  price: "1999",
  offerPrice: "799",
  updated: "December 2025",

  content: [
    {
      sectionTitle: "Introduction to Spring Boot",
      lessons: [
        { title: "What is Spring Boot? Architecture & Use Cases", videoUrl: "https://example.com/videos/spring-intro.mp4", order: 1 },
        { title: "Spring Boot Setup and First Application", videoUrl: "https://example.com/videos/setup.mp4", order: 2 },
        { title: "Project Structure & Running the Application", videoUrl: "https://example.com/videos/structure.mp4", order: 3 },
        { title: "Dependency Management with Maven & Gradle", videoUrl: "https://example.com/videos/dependencies.mp4", order: 4 }
      ]
    },

    {
      sectionTitle: "REST API Development",
      lessons: [
        { title: "Creating REST Controllers", videoUrl: "https://example.com/videos/controllers.mp4", order: 5 },
        { title: "Request Mapping, DTOs & Validation", videoUrl: "https://example.com/videos/validation.mp4", order: 6 },
        { title: "Service and Repository Layers Explained", videoUrl: "https://example.com/videos/layers.mp4", order: 7 },
        { title: "Error Handling & Response Entities", videoUrl: "https://example.com/videos/errors.mp4", order: 8 }
      ]
    },

    {
      sectionTitle: "Database & JPA",
      lessons: [
        { title: "Connecting to MySQL", videoUrl: "https://example.com/videos/mysql.mp4", order: 9 },
        { title: "Spring Data JPA Basics", videoUrl: "https://example.com/videos/jpa.mp4", order: 10 },
        { title: "CRUD Operations & Entity Relationships", videoUrl: "https://example.com/videos/crud.mp4", order: 11 },
        { title: "Pagination & Sorting", videoUrl: "https://example.com/videos/pagination.mp4", order: 12 }
      ]
    },

    {
      sectionTitle: "Integrating Generative AI",
      lessons: [
        { title: "Introduction to Generative AI & LLMs", videoUrl: "https://example.com/videos/ai-intro.mp4", order: 13 },
        { title: "Calling OpenAI / Gemini / LLaMA APIs from Spring Boot", videoUrl: "https://example.com/videos/openai.mp4", order: 14 },
        { title: "Building AI-Driven Text Generation Endpoint", videoUrl: "https://example.com/videos/gen-endpoint.mp4", order: 15 },
        { title: "Real-Time Chatbot API Integration", videoUrl: "https://example.com/videos/chatbot.mp4", order: 16 }
      ]
    },

    {
      sectionTitle: "Security & Authentication",
      lessons: [
        { title: "Spring Security Fundamentals", videoUrl: "https://example.com/videos/security.mp4", order: 17 },
        { title: "JWT Authentication with Refresh Token", videoUrl: "https://example.com/videos/jwt.mp4", order: 18 },
        { title: "Role-Based Authorization", videoUrl: "https://example.com/videos/roles.mp4", order: 19 }
      ]
    },

    {
      sectionTitle: "Microservices & Messaging",
      lessons: [
        { title: "Introduction to Microservices Architecture", videoUrl: "https://example.com/videos/microservices.mp4", order: 20 },
        { title: "Service Discovery with Eureka", videoUrl: "https://example.com/videos/eureka.mp4", order: 21 },
        { title: "API Gateway with Spring Cloud", videoUrl: "https://example.com/videos/gateway.mp4", order: 22 },
        { title: "Kafka & Messaging Basics", videoUrl: "https://example.com/videos/kafka.mp4", order: 23 }
      ]
    },

    {
      sectionTitle: "Testing & Documentation",
      lessons: [
        { title: "JUnit & Mockito Testing", videoUrl: "https://example.com/videos/testing.mp4", order: 24 },
        { title: "Swagger OpenAPI Documentation", videoUrl: "https://example.com/videos/swagger.mp4", order: 25 }
      ]
    },

    {
      sectionTitle: "Docker & Deployment",
      lessons: [
        { title: "Dockerizing a Spring Boot Application", videoUrl: "https://example.com/videos/docker.mp4", order: 26 },
        { title: "CI/CD Deployment Pipeline", videoUrl: "https://example.com/videos/cicd.mp4", order: 27 },
        { title: "Deploying to AWS / Render / Railway", videoUrl: "https://example.com/videos/deploy.mp4", order: 28 }
      ]
    },

    {
      sectionTitle: "Capstone Project",
      lessons: [
        { title: "Build AI-Powered Employee Management System", videoUrl: "https://example.com/videos/project.mp4", order: 29 },
        { title: "Project Presentation & Portfolio Upload", videoUrl: "https://example.com/videos/portfolio.mp4", order: 30 }
      ]
    }
  ]
},

  //sql
 {
  instructor: "John Doe",
  name: "SYSTEM DESIGN",
  level: "Intermediate",
  category: "System Design",
  skillId: "r34sfsfs0006",
  subtitle: "Master System Design for Scalable Applications",
  desc: "Learn how to design scalable, reliable, and highly available systems using real world system design concepts, architectures, and case studies.",
  link: "https://www.geeksforgeeks.org/system-design-tutorial/",
  image: systemDesign,
  duration: "6 weeks",
  lessons: 26,
  rating: 4.8,
  ratersCount: 350,
  price: "2999",
  offerPrice: "1199",
  updated: "November 2025",

  content: [
    {
      sectionTitle: "Introduction to System Design",
      lessons: [
        { title: "What is System Design?", videoUrl: "https://example.com/videos/intro-sd.mp4", order: 1 },
        { title: "Scalability & High Availability", videoUrl: "https://example.com/videos/scalability.mp4", order: 2 },
      ],
    },
    {
      sectionTitle: "System Design Fundamentals",
      lessons: [
        { title: "Load Balancing", videoUrl: "https://example.com/videos/load-balancing.mp4", order: 3 },
        { title: "Caching Strategies", videoUrl: "https://example.com/videos/caching.mp4", order: 4 },
        { title: "Database Sharding & Replication", videoUrl: "https://example.com/videos/sharding.mp4", order: 5 },
      ],
    },
    {
      sectionTitle: "Core Components",
      lessons: [
        { title: "Message Queues", videoUrl: "https://example.com/videos/queue.mp4", order: 6 },
        { title: "CDN & Edge Delivery", videoUrl: "https://example.com/videos/cdn.mp4", order: 7 },
        { title: "API Gateway & Microservices", videoUrl: "https://example.com/videos/microservices.mp4", order: 8 },
      ],
    },
    {
      sectionTitle: "System Design Case Studies",
      lessons: [
        { title: "Design URL Shortener Like Bitly", videoUrl: "https://example.com/videos/url-shortener.mp4", order: 9 },
        { title: "Design Instagram", videoUrl: "https://example.com/videos/instagram.mp4", order: 10 },
        { title: "Design Uber", videoUrl: "https://example.com/videos/uber.mp4", order: 11 },
        { title: "Design Chat System Like WhatsApp", videoUrl: "https://example.com/videos/chat-system.mp4", order: 12 },
      ],
    },
    {
      sectionTitle: "Advanced Architecture Concepts",
      lessons: [
        { title: "Event Driven Architecture", videoUrl: "https://example.com/videos/event-driven.mp4", order: 13 },
        { title: "CAP & PACELC Theorem", videoUrl: "https://example.com/videos/cap-pacelc.mp4", order: 14 },
        { title: "Distributed Consensus – Raft & Paxos", videoUrl: "https://example.com/videos/consensus.mp4", order: 15 },
      ],
    },
    {
      sectionTitle: "Final Projects",
      lessons: [
        { title: "System Design for E-Commerce Platform", videoUrl: "https://example.com/videos/ecommerce.mp4", order: 16 },
        { title: "Mock Interview & Review", videoUrl: "https://example.com/videos/interview.mp4", order: 17 },
      ],
    },
  ],
}
,

 {
  instructor: "Rajesh Patel",
  name: "BASIC OF ROBOTICS",
  level: "Intermediate",
  category: "Robotics",
  skillId: "r34sfsfs0007",
  subtitle: "Learn Core Robotics Concepts and Build Real-World Automation Projects",
  desc: "Understand fundamental robotics concepts, microcontrollers, sensors, actuators, and robot programming. Build and control robots using Arduino and real-world components.",
  link: "https://www.roboticsfoundation.org/",
  image: robotics,
  duration: "4 weeks",
  lessons: 22,
  rating: 4.8,
  ratersCount: 270,
  price: "1499",
  offerPrice: "799",
  updated: "November 2025",

  content: [
    {
      sectionTitle: "Introduction to Robotics",
      lessons: [
        { title: "What is Robotics?", videoUrl: "https://example.com/videos/robotics-intro.mp4", order: 1 },
        { title: "Types of Robots & Applications", videoUrl: "https://example.com/videos/types-of-robots.mp4", order: 2 },
        { title: "Basics of Mechatronics and Automation", videoUrl: "https://example.com/videos/automation.mp4", order: 3 },
      ],
    },

    {
      sectionTitle: "Microcontrollers & Hardware",
      lessons: [
        { title: "Introduction to Arduino & Microcontrollers", videoUrl: "https://example.com/videos/arduino-intro.mp4", order: 4 },
        { title: "Understanding Sensors & Actuators", videoUrl: "https://example.com/videos/sensors-actuators.mp4", order: 5 },
        { title: "Motors, Drivers, and Power Supply", videoUrl: "https://example.com/videos/motors.mp4", order: 6 },
      ],
    },

    {
      sectionTitle: "Electronics & Circuit Building",
      lessons: [
        { title: "Basic Electronics & Connections", videoUrl: "https://example.com/videos/electronics-basics.mp4", order: 7 },
        { title: "Using Breadboard and Circuit Design", videoUrl: "https://example.com/videos/breadboard.mp4", order: 8 },
        { title: "Safety and Precautions", videoUrl: "https://example.com/videos/safety.mp4", order: 9 },
      ],
    },

    {
      sectionTitle: "Programming for Robotics",
      lessons: [
        { title: "Arduino Programming Basics", videoUrl: "https://example.com/videos/arduino-programming.mp4", order: 10 },
        { title: "Working with Sensors (Ultrasonic, IR, LDR)", videoUrl: "https://example.com/videos/sensors-control.mp4", order: 11 },
        { title: "Control Motors & Movement Control", videoUrl: "https://example.com/videos/motor-control.mp4", order: 12 },
      ],
    },

    {
      sectionTitle: "Robotics Projects",
      lessons: [
        { title: "Line Follower Robot", videoUrl: "https://example.com/videos/line-follower.mp4", order: 13 },
        { title: "Obstacle Avoidance Robot", videoUrl: "https://example.com/videos/obstacle-avoid.mp4", order: 14 },
        { title: "Bluetooth Controlled Robot", videoUrl: "https://example.com/videos/bluetooth-robot.mp4", order: 15 },
      ],
    },

    {
      sectionTitle: "Final Project & Deployment",
      lessons: [
        { title: "Assembling a Smart Autonomous Robot", videoUrl: "https://example.com/videos/final-build.mp4", order: 16 },
        { title: "Testing, Debugging & Improvements", videoUrl: "https://example.com/videos/debug.mp4", order: 17 },
        { title: "Showcase & Certification", videoUrl: "https://example.com/videos/certificate.mp4", order: 18 },
      ],
    },
  ],
}
,
  {
  instructor: "Rajesh Patel",
  name: "DRONE TECHNOLOGY",
  level: "Intermediate",
  category: "Drone Technology",
  skillId: "r34sfsfs0008",
  subtitle: "Learn Drone Engineering, Flight Control, and UAV Operations",
  desc: "Understand drone technology, aerodynamics, electronic components, sensors, flight controllers, and real project-based UAV design along with safety and industry applications.",
  link: "https://www.faa.gov/uas",
  image: DRONE,
  duration: "4 weeks",
  lessons: 22,
  rating: 4.8,
  ratersCount: 270,
  price: "1599",
  offerPrice: "799",
  updated: "November 2025",

  content: [
    {
      sectionTitle: "Introduction to Drone Technology",
      lessons: [
        { title: "What is a Drone? Types & Applications", videoUrl: "https://example.com/videos/intro-drone.mp4", order: 1 },
        { title: "How UAVs Work - Core Concepts", videoUrl: "https://example.com/videos/uav-concepts.mp4", order: 2 },
        { title: "Drone Aerodynamics & Lift Theory", videoUrl: "https://example.com/videos/aerodynamics.mp4", order: 3 },
      ],
    },

    {
      sectionTitle: "Drone Hardware Components",
      lessons: [
        { title: "Frames, Propellers & Motors", videoUrl: "https://example.com/videos/motors-propellers.mp4", order: 4 },
        { title: "ESC, Flight Controller & Battery Types", videoUrl: "https://example.com/videos/esc-fc-battery.mp4", order: 5 },
        { title: "Sensors: GPS, Gyroscope, Accelerometer", videoUrl: "https://example.com/videos/sensors.mp4", order: 6 },
      ],
    },

    {
      sectionTitle: "Electronics & Assembly",
      lessons: [
        { title: "Wiring and Power Distribution", videoUrl: "https://example.com/videos/wiring.mp4", order: 7 },
        { title: "Calibrating Drone Components", videoUrl: "https://example.com/videos/calibration.mp4", order: 8 },
        { title: "Building a Basic Quadcopter", videoUrl: "https://example.com/videos/quadcopter-build.mp4", order: 9 },
      ],
    },

    {
      sectionTitle: "Drone Programming & Flight Control",
      lessons: [
        { title: "Introduction to Flight Control Software (Betaflight / Ardupilot)", videoUrl: "https://example.com/videos/flight-control.mp4", order: 10 },
        { title: "Remote Control & Radio Communication", videoUrl: "https://example.com/videos/radio-control.mp4", order: 11 },
        { title: "Autonomous Flight & GPS Missions", videoUrl: "https://example.com/videos/autonomous-flight.mp4", order: 12 },
      ],
    },

    {
      sectionTitle: "Safety, Regulations & Testing",
      lessons: [
        { title: "Drone Safety Rules & Flying Guidelines", videoUrl: "https://example.com/videos/safety-rules.mp4", order: 13 },
        { title: "Government Drone Licensing Requirements", videoUrl: "https://example.com/videos/licensing.mp4", order: 14 },
        { title: "Field Testing & Troubleshooting", videoUrl: "https://example.com/videos/testing.mp4", order: 15 },
      ],
    },

    {
      sectionTitle: "Final Project",
      lessons: [
        { title: "Build & Test Autonomous Drone Project", videoUrl: "https://example.com/videos/final-project.mp4", order: 16 },
        { title: "Performance Review & Improvement", videoUrl: "https://example.com/videos/performance-review.mp4", order: 17 },
      ],
    },
  ],
}
,

  //nodejs
 {
  instructor: "Rajesh Patel",
  name: "AUTO CAD",
  level: "Intermediate",
  category: "AutoCAD",
  skillId: "r34sfsfs0009",
  subtitle: "Master 2D & 3D Computer-Aided Design for Engineering & Architecture",
  desc: "Learn professional AutoCAD drafting, 2D drawing, 3D modeling, annotations, layers, plotting, and real project blueprints used in civil, mechanical, and architectural design.",
  link: "https://www.autodesk.com/products/autocad/overview",
  image: node, // replace with autocad image variable if available
  duration: "4 weeks",
  lessons: 24,
  rating: 4.8,
  ratersCount: 270,
  price: "1799",
  offerPrice: "799",
  updated: "November 2025",

  content: [
    {
      sectionTitle: "Introduction to AutoCAD",
      lessons: [
        { title: "What is AutoCAD and its Applications?", videoUrl: "https://example.com/videos/autocad-intro.mp4", order: 1 },
        { title: "AutoCAD Interface & Workspace Setup", videoUrl: "https://example.com/videos/workspace-setup.mp4", order: 2 },
        { title: "Navigation Tools & Basic Commands", videoUrl: "https://example.com/videos/navigation.mp4", order: 3 },
      ],
    },

    {
      sectionTitle: "AutoCAD 2D Drafting",
      lessons: [
        { title: "Drawing Tools (Line, Circle, Arc)", videoUrl: "https://example.com/videos/drawing-tools.mp4", order: 4 },
        { title: "Modify Tools (Trim, Extend, Offset)", videoUrl: "https://example.com/videos/modify-tools.mp4", order: 5 },
        { title: "Object Snaps & Tracking", videoUrl: "https://example.com/videos/osnap.mp4", order: 6 },
      ],
    },

    {
      sectionTitle: "Layers, Dimensions & Annotation",
      lessons: [
        { title: "Working with Layers & Line Types", videoUrl: "https://example.com/videos/layers.mp4", order: 7 },
        { title: "Dimensioning & Text Annotation", videoUrl: "https://example.com/videos/dimensions-text.mp4", order: 8 },
        { title: "Blocks, Templates & Attributes", videoUrl: "https://example.com/videos/blocks.mp4", order: 9 },
      ],
    },

    {
      sectionTitle: "AutoCAD 3D Modeling",
      lessons: [
        { title: "Introduction to 3D Commands", videoUrl: "https://example.com/videos/3d-basics.mp4", order: 10 },
        { title: "Extrude, Sweep, Loft & Revolve", videoUrl: "https://example.com/videos/extrude-loft.mp4", order: 11 },
        { title: "Rendering & Visual Styles", videoUrl: "https://example.com/videos/rendering.mp4", order: 12 },
      ],
    },

    {
      sectionTitle: "Blueprints & Plotting",
      lessons: [
        { title: "Layout, Scale & Printing Setup", videoUrl: "https://example.com/videos/printing.mp4", order: 13 },
        { title: "Creating Professional Drawings", videoUrl: "https://example.com/videos/prof-drawings.mp4", order: 14 },
      ],
    },

    {
      sectionTitle: "Final Project",
      lessons: [
        { title: "2D House Plan Drawing Project", videoUrl: "https://example.com/videos/house-plan.mp4", order: 15 },
        { title: "3D Mechanical Component Modeling", videoUrl: "https://example.com/videos/mech-model.mp4", order: 16 },
      ],
    },
  ],
}
,
 {
  instructor: "Rajesh Patel",
  name: "PYTHON PROGRAMMING",
  level: "Intermediate",
  category: "Backend Development",
  skillId: "r34sfsfs00010",
  subtitle: "Build Fast and Scalable Backend Applications with Python",
  desc: "Learn backend development using Python, Flask/Django, REST APIs, database integration, authentication, and deployment.",
  link: "https://docs.python.org/3/",
  image: python,  // add python image import
  duration: "4 week",
  lessons: 22,
  rating: 4.8,
  ratersCount: 270,
  price: "1599",
  offerPrice: "799",
  updated: "November 2025",
  content: [
    {
      sectionTitle: "Introduction to Python",
      lessons: [
        {
          title: "What is Python & Why Use It?",
          videoUrl: "https://example.com/videos/python-intro.mp4",
          order: 1,
        },
        {
          title: "Installing Python & IDE Setup",
          videoUrl: "https://example.com/videos/python-setup.mp4",
          order: 2,
        },
        {
          title: "Python Basics & First Script",
          videoUrl: "https://example.com/videos/python-basics.mp4",
          order: 3,
        },
      ],
    },

    {
      sectionTitle: "Python for Backend",
      lessons: [
        {
          title: "Understanding Backend Architecture",
          videoUrl: "https://example.com/videos/backend-architecture.mp4",
          order: 4,
        },
        {
          title: "Working with Virtual Environment",
          videoUrl: "https://example.com/videos/venv.mp4",
          order: 5,
        },
      ],
    },

    {
      sectionTitle: "Flask Framework",
      lessons: [
        {
          title: "Introduction to Flask",
          videoUrl: "https://example.com/videos/flask-intro.mp4",
          order: 6,
        },
        {
          title: "Building REST APIs with Flask",
          videoUrl: "https://example.com/videos/flask-rest-api.mp4",
          order: 7,
        },
        {
          title: "Routing & Middleware",
          videoUrl: "https://example.com/videos/flask-routing.mp4",
          order: 8,
        },
      ],
    },

    {
      sectionTitle: "Database & ORM",
      lessons: [
        {
          title: "Connecting Python with MySQL/MongoDB",
          videoUrl: "https://example.com/videos/db-connect.mp4",
          order: 9,
        },
        {
          title: "CRUD Operations with SQLAlchemy",
          videoUrl: "https://example.com/videos/sqlalchemy-crud.mp4",
          order: 10,
        },
      ],
    },

    {
      sectionTitle: "Authentication & Security",
      lessons: [
        {
          title: "User Authentication using JWT",
          videoUrl: "https://example.com/videos/python-jwt.mp4",
          order: 11,
        },
        {
          title: "Error Handling & Validation",
          videoUrl: "https://example.com/videos/error-handling.mp4",
          order: 12,
        },
      ],
    },

    {
      sectionTitle: "Deployment",
      lessons: [
        {
          title: "Deploying Python API to Render / Railway",
          videoUrl: "https://example.com/videos/deploy-python.mp4",
          order: 13,
        },
      ],
    },

    {
      sectionTitle: "Final Project",
      lessons: [
        {
          title: "Build REST API for Blog Application",
          videoUrl: "https://example.com/videos/python-blog-api.mp4",
          order: 14,
        },
      ],
    },
  ],
}
,
  //aws
{
  instructor: "John Doe",
  name: "AWS (Amazon Web Services)",
  level: "Intermediate",
  category: "Cloud Computing",
  skillId: "r34sfsfs00011",
  subtitle: "Master AWS Cloud Infrastructure and Services",
  desc: "Learn to deploy, manage, and scale applications using key AWS services including EC2, S3, Lambda, RDS, VPC, IAM, CloudFront, and DevOps deployment pipelines.",
  link: "https://aws.amazon.com/getting-started/",
  image: aws,
  duration: "4 week",
  lessons: 21,
  rating: 4.8,
  ratersCount: 320,
  price: "2099",
  offerPrice: "999",
  updated: "December 2025",
  content: [
    {
      sectionTitle: "Introduction to Cloud and AWS",
      lessons: [
        { title: "What is Cloud Computing?", videoUrl: "https://example.com/videos/cloud-intro.mp4", order: 1 },
        { title: "Getting Started with AWS", videoUrl: "https://example.com/videos/aws-intro.mp4", order: 2 },
        { title: "AWS Global Infrastructure", videoUrl: "https://example.com/videos/aws-infra.mp4", order: 3 },
      ],
    },
    {
      sectionTitle: "Compute Services",
      lessons: [
        { title: "EC2 Instances", videoUrl: "https://example.com/videos/ec2.mp4", order: 4 },
        { title: "Elastic Load Balancer", videoUrl: "https://example.com/videos/elb.mp4", order: 5 },
        { title: "Auto Scaling Groups", videoUrl: "https://example.com/videos/auto-scaling.mp4", order: 6 },
      ],
    },
    {
      sectionTitle: "Storage Services",
      lessons: [
        { title: "Amazon S3 Basics", videoUrl: "https://example.com/videos/s3.mp4", order: 7 },
        { title: "EBS and EFS Storage", videoUrl: "https://example.com/videos/ebs.mp4", order: 8 },
        { title: "CloudFront and CDN Caching", videoUrl: "https://example.com/videos/cloudfront.mp4", order: 9 },
      ],
    },
    {
      sectionTitle: "Databases and Serverless",
      lessons: [
        { title: "RDS and DynamoDB", videoUrl: "https://example.com/videos/rds.mp4", order: 10 },
        { title: "Serverless with AWS Lambda", videoUrl: "https://example.com/videos/lambda.mp4", order: 11 },
        { title: "API Gateway Integration", videoUrl: "https://example.com/videos/api-gateway.mp4", order: 12 },
      ],
    },
    {
      sectionTitle: "Security, Networking & Monitoring",
      lessons: [
        { title: "IAM Users, Roles & Policies", videoUrl: "https://example.com/videos/iam.mp4", order: 13 },
        { title: "VPC Networking Basics", videoUrl: "https://example.com/videos/vpc.mp4", order: 14 },
        { title: "Monitoring with CloudWatch", videoUrl: "https://example.com/videos/cloudwatch.mp4", order: 15 },
        { title: "AWS CloudTrail & Auditing", videoUrl: "https://example.com/videos/cloudtrail.mp4", order: 16 },
      ],
    },
    {
      sectionTitle: "Deployment & DevOps",
      lessons: [
        { title: "Deploying an App on AWS", videoUrl: "https://example.com/videos/deploy-app.mp4", order: 17 },
        { title: "CI/CD with CodePipeline", videoUrl: "https://example.com/videos/codepipeline.mp4", order: 18 },
      ],
    },
    {
      sectionTitle: "Final Project",
      lessons: [
        { title: "Host a Full-Stack App on AWS", videoUrl: "https://example.com/videos/final-project.mp4", order: 19 },
        { title: "Performance Optimization & Cost Management", videoUrl: "https://example.com/videos/cost-opt.mp4", order: 20 },
        { title: "Course Summary & Next Steps", videoUrl: "https://example.com/videos/summary.mp4", order: 21 },
      ],
    },
  ],
}
,
 {
  instructor: "Rajehs Kumar",
  name: "Artificial Intelligence (AI)",
  level: "Advanced",
  category: "Machine Learning & AI",
  skillId: "r34sfsfs00012",
  subtitle: "Master AI Concepts, Neural Networks, and Real-World Applications",
  desc: "Learn to build intelligent systems using Python, TensorFlow, and advanced algorithms for image, text, and real-world AI deployment.",
  link: "https://developers.google.com/machine-learning",
  image: ai,
  duration: "4 week",
  lessons: 24,
  rating: 4.9,
  ratersCount: 450,
  price: "1999",
  offerPrice: "899",
  updated: "November 2025",
  content: [
    {
      sectionTitle: "Introduction to AI",
      lessons: [
        { title: "What is Artificial Intelligence?", videoUrl: "https://example.com/videos/ai-intro.mp4", order: 1 },
        { title: "History and Applications of AI", videoUrl: "https://example.com/videos/ai-history.mp4", order: 2 },
        { title: "AI vs Machine Learning vs Deep Learning", videoUrl: "https://example.com/videos/ai-ml-dl.mp4", order: 3 },
      ],
    },
    {
      sectionTitle: "Machine Learning Basics",
      lessons: [
        { title: "Supervised & Unsupervised Learning", videoUrl: "https://example.com/videos/ml-basics.mp4", order: 4 },
        { title: "Linear & Logistic Regression", videoUrl: "https://example.com/videos/regression.mp4", order: 5 },
        { title: "Model Evaluation Metrics", videoUrl: "https://example.com/videos/model-metrics.mp4", order: 6 },
      ],
    },
    {
      sectionTitle: "Neural Networks & Deep Learning",
      lessons: [
        { title: "Understanding Neural Networks", videoUrl: "https://example.com/videos/nn-intro.mp4", order: 7 },
        { title: "Building Networks with TensorFlow", videoUrl: "https://example.com/videos/tensorflow.mp4", order: 8 },
        { title: "CNNs for Image Recognition", videoUrl: "https://example.com/videos/cnn.mp4", order: 9 },
      ],
    },
    {
      sectionTitle: "Natural Language Processing (NLP)",
      lessons: [
        { title: "Text Preprocessing & Tokenization", videoUrl: "https://example.com/videos/nlp-prep.mp4", order: 10 },
        { title: "Word Embeddings & Transformers", videoUrl: "https://example.com/videos/transformers.mp4", order: 11 },
        { title: "Building a Chatbot", videoUrl: "https://example.com/videos/chatbot.mp4", order: 12 },
      ],
    },
    {
      sectionTitle: "AI in Practice",
      lessons: [
        { title: "AI for Computer Vision", videoUrl: "https://example.com/videos/computer-vision.mp4", order: 13 },
        { title: "AI for Recommendation Systems", videoUrl: "https://example.com/videos/recommendation.mp4", order: 14 },
        { title: "AI in Robotics", videoUrl: "https://example.com/videos/robotics.mp4", order: 15 },
      ],
    },
    {
      sectionTitle: "Advanced AI Topics",
      lessons: [
        { title: "Reinforcement Learning (RL Basics)", videoUrl: "https://example.com/videos/rl-basics.mp4", order: 16 },
        { title: "Generative Adversarial Networks (GANs)", videoUrl: "https://example.com/videos/gans.mp4", order: 17 },
        { title: "Transfer Learning Models", videoUrl: "https://example.com/videos/transfer-learning.mp4", order: 18 },
        { title: "Edge AI & Model Optimization", videoUrl: "https://example.com/videos/edge-ai.mp4", order: 19 },
      ],
    },
    {
      sectionTitle: "AI Deployment & Ethics",
      lessons: [
        { title: "Deploying AI Models to Cloud", videoUrl: "https://example.com/videos/deploy-ai.mp4", order: 20 },
        { title: "MLOps & Monitoring Models", videoUrl: "https://example.com/videos/mlops.mp4", order: 21 },
        { title: "AI Ethics & Regulations", videoUrl: "https://example.com/videos/ai-ethics.mp4", order: 22 },
      ],
    },
    {
      sectionTitle: "Final Project",
      lessons: [
        { title: "Build an AI Image Classifier", videoUrl: "https://example.com/videos/ai-project.mp4", order: 23 },
        { title: "Course Summary & Future Learning Paths", videoUrl: "https://example.com/videos/summary.mp4", order: 24 },
      ],
    },
  ],
}

];

export const levelColor = {
  Beginner: "bg-green-500",
  Intermediate: "bg-yellow-500",
  Advanced: "bg-red-500",
};

export const hoverGradient = {
  Beginner: "from-green-400/30 via-emerald-300/30 to-transparent",
  Intermediate: "from-yellow-300/30 via-orange-200/30 to-transparent",
  Advanced: "from-red-400/30 via-pink-300/30 to-transparent",
};
