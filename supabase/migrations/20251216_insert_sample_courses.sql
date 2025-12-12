-- Insert comprehensive course data for all branches with varied durations
-- Created: 2025-12-12
-- Includes: Online courses (2, 4, 6 weeks) + Industrial Training (2, 4, 6 weeks)

-- ============================================================================
-- COMPUTER SCIENCE / IT / DATA SCIENCE - ONLINE COURSES
-- ============================================================================

-- 2 Week Online Courses
INSERT INTO public.courses (course_id, course_title, course_slug, course_type, branch, instructor_name, course_image, price_cents, mrp_cents, currency, duration, description, skill_level, status) VALUES
('cse_python_2w', 'Python Programming Crash Course', 'python-programming-crash-course', 'online', 'CSE', 'Sneha Reddy', 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=400', 99900, 149900, 'INR', '2 weeks', 'Intensive Python basics covering syntax, data types, functions, and simple projects.', 'beginner', 'active'),
('cse_git_2w', 'Git & GitHub Essentials', 'git-github-essentials', 'online', 'IT', 'Amit Verma', 'https://images.unsplash.com/photo-1556075798-4825dfaaf498?w=400', 79900, 119900, 'INR', '2 weeks', 'Master version control with Git, GitHub workflows, branching, merging, and collaboration.', 'beginner', 'active'),
('cse_sql_2w', 'SQL Database Fundamentals', 'sql-database-fundamentals', 'online', 'CSE', 'Priya Sharma', 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=400', 89900, 129900, 'INR', '2 weeks', 'Learn SQL queries, joins, database design, and basic optimization techniques.', 'beginner', 'active'),
('ds_excel_2w', 'Excel for Data Analysis', 'excel-for-data-analysis', 'online', 'DS', 'Ravi Kumar', 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400', 69900, 99900, 'INR', '2 weeks', 'Advanced Excel formulas, pivot tables, data visualization, and business analytics.', 'beginner', 'active')
ON CONFLICT (course_slug) DO NOTHING;

-- 4 Week Online Courses
INSERT INTO public.courses (course_id, course_title, course_slug, course_type, branch, instructor_name, course_image, price_cents, mrp_cents, currency, duration, description, skill_level, status) VALUES
('cse_react_4w', 'React.js Development', 'reactjs-development', 'online', 'IT', 'Vikram Singh', 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400', 199900, 299900, 'INR', '4 weeks', 'Build modern web apps with React, hooks, state management, and component architecture.', 'intermediate', 'active'),
('cse_nodejs_4w', 'Node.js Backend Development', 'nodejs-backend-development', 'online', 'CSE', 'Karthik Iyer', 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400', 199900, 299900, 'INR', '4 weeks', 'Create RESTful APIs with Node.js, Express, MongoDB, and authentication systems.', 'intermediate', 'active'),
('ds_datascience_4w', 'Data Science Essentials', 'data-science-essentials', 'online', 'DS', 'Dr. Anjali Mehta', 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400', 249900, 349900, 'INR', '4 weeks', 'Introduction to data analysis, pandas, numpy, matplotlib, and basic ML concepts.', 'beginner', 'active'),
('cse_flutter_4w', 'Flutter Mobile App Development', 'flutter-mobile-app-development', 'online', 'CSE', 'Neha Kapoor', 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400', 229900, 329900, 'INR', '4 weeks', 'Build cross-platform mobile apps with Flutter and Dart for iOS and Android.', 'intermediate', 'active')
ON CONFLICT (course_slug) DO NOTHING;

-- 6 Week Online Courses
INSERT INTO public.courses (course_id, course_title, course_slug, course_type, branch, instructor_name, course_image, price_cents, mrp_cents, currency, duration, description, skill_level, status) VALUES
('cse_ml_6w', 'Machine Learning Fundamentals', 'machine-learning-fundamentals', 'online', 'CSE', 'Dr. Rajesh Kumar', 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400', 299900, 449900, 'INR', '6 weeks', 'Complete ML course covering supervised/unsupervised learning, neural networks, and applications.', 'intermediate', 'active'),
('cse_android_6w', 'Android Development with Kotlin', 'android-development-kotlin', 'online', 'CSE', 'Rohit Agarwal', 'https://images.unsplash.com/photo-1607252650355-f7fd0460ccdb?w=400', 279900, 399900, 'INR', '6 weeks', 'Build Android apps using Kotlin, Jetpack Compose, MVVM architecture, and material design.', 'intermediate', 'active'),
('it_fullstack_6w', 'Full Stack MERN Development', 'full-stack-mern-development', 'online', 'IT', 'Amit Verma', 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400', 349900, 499900, 'INR', '6 weeks', 'Master MongoDB, Express, React, Node.js and build complete web applications from scratch.', 'intermediate', 'active'),
('ds_python_6w', 'Python for Data Science', 'python-for-data-science', 'online', 'DS', 'Dr. Meera Nair', 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=400', 299900, 449900, 'INR', '6 weeks', 'Python programming, pandas, numpy, scikit-learn, data visualization, and ML basics.', 'beginner', 'active')
ON CONFLICT (course_slug) DO NOTHING;

-- ============================================================================
-- CSE/IT - INDUSTRIAL TRAINING
-- ============================================================================

-- 2 Week Industrial Training
INSERT INTO public.courses (course_id, course_title, course_slug, course_type, branch, instructor_name, course_image, price_cents, mrp_cents, currency, duration, description, skill_level, status) VALUES
('cse_it_webdev_2w', 'Web Development Industrial Training', 'web-development-industrial-training-2w', 'industrial_training', 'CSE', 'Industry Expert', 'https://images.unsplash.com/photo-1547658719-da2b51169166?w=400', 149900, 199900, 'INR', '2 weeks', 'Hands-on HTML, CSS, JavaScript, and Bootstrap training with live projects in IT industry.', 'beginner', 'active'),
('it_it_network_2w', 'Network Administration Training', 'network-administration-training-2w', 'industrial_training', 'IT', 'Network Specialist', 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=400', 139900, 189900, 'INR', '2 weeks', 'Practical training on networking basics, LAN/WAN, routers, switches, and troubleshooting.', 'beginner', 'active')
ON CONFLICT (course_slug) DO NOTHING;

-- 4 Week Industrial Training
INSERT INTO public.courses (course_id, course_title, course_slug, course_type, branch, instructor_name, course_image, price_cents, mrp_cents, currency, duration, description, skill_level, status) VALUES
('cse_it_softdev_4w', 'Software Development Industrial Training', 'software-development-industrial-training-4w', 'industrial_training', 'CSE', 'Senior Developer', 'https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?w=400', 299900, 449900, 'INR', '4 weeks', 'Real-world software development with Java/Python, version control, agile, and live projects.', 'intermediate', 'active'),
('it_it_cloud_4w', 'Cloud Computing Industrial Training', 'cloud-computing-industrial-training-4w', 'industrial_training', 'IT', 'Cloud Architect', 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400', 349900, 499900, 'INR', '4 weeks', 'Hands-on AWS/Azure training covering EC2, S3, Lambda, containers, and cloud deployment.', 'intermediate', 'active')
ON CONFLICT (course_slug) DO NOTHING;

-- 6 Week Industrial Training
INSERT INTO public.courses (course_id, course_title, course_slug, course_type, branch, instructor_name, course_image, price_cents, mrp_cents, currency, duration, description, skill_level, status) VALUES
('cse_it_ai_6w', 'AI/ML Industrial Training', 'ai-ml-industrial-training-6w', 'industrial_training', 'CSE', 'AI Research Engineer', 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400', 449900, 599900, 'INR', '6 weeks', 'Industry AI/ML training with TensorFlow, PyTorch, computer vision, NLP, and real datasets.', 'advanced', 'active'),
('it_it_fullstack_6w', 'Full Stack Industrial Training', 'full-stack-industrial-training-6w', 'industrial_training', 'IT', 'Full Stack Lead', 'https://images.unsplash.com/photo-1593720213428-28a5b9e94613?w=400', 449900, 599900, 'INR', '6 weeks', 'Complete full-stack training with React, Node, databases, deployment, and capstone project.', 'advanced', 'active')
ON CONFLICT (course_slug) DO NOTHING;

-- ============================================================================
-- CIVIL ENGINEERING - ONLINE COURSES
-- ============================================================================

-- 2 Week Online Courses
INSERT INTO public.courses (course_id, course_title, course_slug, course_type, branch, instructor_name, course_image, price_cents, mrp_cents, currency, duration, description, skill_level, status) VALUES
('civil_autocad_2w', 'AutoCAD Basics for Civil', 'autocad-basics-civil-2w', 'online', 'Civil', 'Er. Ashok Verma', 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=400', 89900, 129900, 'INR', '2 weeks', '2D drafting basics, drawing commands, layers, and simple civil engineering drawings.', 'beginner', 'active'),
('civil_survey_2w', 'Land Surveying Fundamentals', 'land-surveying-fundamentals-2w', 'online', 'Civil', 'Er. Vijay Kumar', 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400', 79900, 119900, 'INR', '2 weeks', 'Basics of surveying, leveling, chain surveying, compass surveying, and field work.', 'beginner', 'active')
ON CONFLICT (course_slug) DO NOTHING;

-- 4 Week Online Courses
INSERT INTO public.courses (course_id, course_title, course_slug, course_type, branch, instructor_name, course_image, price_cents, mrp_cents, currency, duration, description, skill_level, status) VALUES
('civil_autocad_4w', 'AutoCAD for Civil Engineers', 'autocad-civil-engineers-4w', 'online', 'Civil', 'Er. Rakesh Jain', 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=400', 189900, 279900, 'INR', '4 weeks', 'Complete AutoCAD training covering 2D/3D drafting and civil engineering drawings.', 'beginner', 'active'),
('civil_estimation_4w', 'Quantity Surveying & Estimation', 'quantity-surveying-estimation-4w', 'online', 'Civil', 'Er. Dinesh Sharma', 'https://images.unsplash.com/photo-1503435980610-a51f3fdfee2c?w=400', 199900, 299900, 'INR', '4 weeks', 'Learn estimation, costing, BOQ preparation, rate analysis, and project budgeting.', 'intermediate', 'active')
ON CONFLICT (course_slug) DO NOTHING;

-- 6 Week Online Courses
INSERT INTO public.courses (course_id, course_title, course_slug, course_type, branch, instructor_name, course_image, price_cents, mrp_cents, currency, duration, description, skill_level, status) VALUES
('civil_staadpro_6w', 'STAAD.Pro Structural Analysis', 'staadpro-structural-analysis-6w', 'online', 'Civil', 'Dr. Manoj Kumar', 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=400', 299900, 449900, 'INR', '6 weeks', 'Master structural analysis and design of buildings, bridges, and steel structures.', 'intermediate', 'active'),
('civil_3dmax_6w', '3D Max Architecture & Rendering', '3dmax-architecture-rendering-6w', 'online', 'Civil', 'Ar. Pooja Desai', 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=400', 279900, 399900, 'INR', '6 weeks', 'Learn 3D modeling, materials, lighting, rendering, and architectural visualization.', 'intermediate', 'active'),
('civil_revit_6w', 'Revit BIM for Civil Engineers', 'revit-bim-civil-engineers-6w', 'online', 'Civil', 'Er. Sanjay Patel', 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=400', 299900, 449900, 'INR', '6 weeks', 'Building Information Modeling (BIM) with Revit for structural and architectural design.', 'intermediate', 'active'),
('civil_planning_6w', 'Building Planning & Vastu', 'building-planning-vastu-6w', 'online', 'Civil', 'Ar. Nisha Rao', 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=400', 249900, 349900, 'INR', '6 weeks', 'Learn building planning principles, space planning, vastu shastra, and architectural design.', 'beginner', 'active')
ON CONFLICT (course_slug) DO NOTHING;

-- ============================================================================
-- CIVIL ENGINEERING - INDUSTRIAL TRAINING
-- ============================================================================

-- 2 Week Industrial Training
INSERT INTO public.courses (course_id, course_title, course_slug, course_type, branch, instructor_name, course_image, price_cents, mrp_cents, currency, duration, description, skill_level, status) VALUES
('civil_it_site_2w', 'Construction Site Training', 'construction-site-training-2w', 'industrial_training', 'Civil', 'Site Engineer', 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=400', 129900, 179900, 'INR', '2 weeks', 'On-site training in construction activities, quality control, site management, and safety.', 'beginner', 'active'),
('civil_it_survey_2w', 'Surveying Field Training', 'surveying-field-training-2w', 'industrial_training', 'Civil', 'Survey Expert', 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400', 119900, 169900, 'INR', '2 weeks', 'Hands-on training with total station, theodolite, GPS, and modern surveying instruments.', 'beginner', 'active')
ON CONFLICT (course_slug) DO NOTHING;

-- 4 Week Industrial Training
INSERT INTO public.courses (course_id, course_title, course_slug, course_type, branch, instructor_name, course_image, price_cents, mrp_cents, currency, duration, description, skill_level, status) VALUES
('civil_it_design_4w', 'Structural Design Industrial Training', 'structural-design-industrial-training-4w', 'industrial_training', 'Civil', 'Structural Engineer', 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=400', 279900, 399900, 'INR', '4 weeks', 'Real-world structural design training using STAAD.Pro, ETABS, and manual calculations.', 'intermediate', 'active'),
('civil_it_highway_4w', 'Highway Engineering Industrial Training', 'highway-engineering-industrial-training-4w', 'industrial_training', 'Civil', 'Highway Engineer', 'https://images.unsplash.com/photo-1503435980610-a51f3fdfee2c?w=400', 269900, 379900, 'INR', '4 weeks', 'Practical training in highway design, traffic engineering, pavement design, and site work.', 'intermediate', 'active')
ON CONFLICT (course_slug) DO NOTHING;

-- 6 Week Industrial Training
INSERT INTO public.courses (course_id, course_title, course_slug, course_type, branch, instructor_name, course_image, price_cents, mrp_cents, currency, duration, description, skill_level, status) VALUES
('civil_it_construction_6w', 'Construction Management Training', 'construction-management-training-6w', 'industrial_training', 'Civil', 'Project Manager', 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=400', 399900, 549900, 'INR', '6 weeks', 'Comprehensive training in project management, estimation, planning, execution, and monitoring.', 'advanced', 'active'),
('civil_it_bim_6w', 'BIM Implementation Industrial Training', 'bim-implementation-industrial-training-6w', 'industrial_training', 'Civil', 'BIM Specialist', 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=400', 429900, 599900, 'INR', '6 weeks', 'Industry BIM training with Revit, Navisworks, clash detection, 4D/5D BIM, and live projects.', 'advanced', 'active')
ON CONFLICT (course_slug) DO NOTHING;

-- ============================================================================
-- MECHANICAL ENGINEERING - ONLINE COURSES
-- ============================================================================

-- 2 Week Online Courses
INSERT INTO public.courses (course_id, course_title, course_slug, course_type, branch, instructor_name, course_image, price_cents, mrp_cents, currency, duration, description, skill_level, status) VALUES
('mech_cad_2w', 'CAD Basics for Mechanical', 'cad-basics-mechanical-2w', 'online', 'Mechanical', 'Er. Arun Joshi', 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=400', 89900, 129900, 'INR', '2 weeks', 'Introduction to CAD drafting, basic 2D/3D modeling, and mechanical part drawings.', 'beginner', 'active')
ON CONFLICT (course_slug) DO NOTHING;

-- 4 Week Online Courses
INSERT INTO public.courses (course_id, course_title, course_slug, course_type, branch, instructor_name, course_image, price_cents, mrp_cents, currency, duration, description, skill_level, status) VALUES
('mech_solidworks_4w', 'SolidWorks Design Training', 'solidworks-design-training-4w', 'online', 'Mechanical', 'Er. Suresh Babu', 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=400', 219900, 319900, 'INR', '4 weeks', 'Learn part modeling, assembly design, sheet metal, and basic simulation in SolidWorks.', 'beginner', 'active'),
('mech_autocad_4w', 'AutoCAD Mechanical Design', 'autocad-mechanical-design-4w', 'online', 'Mechanical', 'Er. Ramesh Yadav', 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=400', 189900, 279900, 'INR', '4 weeks', '2D/3D mechanical drafting, isometric drawings, sectioning, and dimensioning in AutoCAD.', 'beginner', 'active')
ON CONFLICT (course_slug) DO NOTHING;

-- 6 Week Online Courses
INSERT INTO public.courses (course_id, course_title, course_slug, course_type, branch, instructor_name, course_image, price_cents, mrp_cents, currency, duration, description, skill_level, status) VALUES
('mech_ansys_6w', 'ANSYS Finite Element Analysis', 'ansys-finite-element-analysis-6w', 'online', 'Mechanical', 'Dr. Pradeep Kumar', 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=400', 329900, 479900, 'INR', '6 weeks', 'Learn structural, thermal, and modal analysis using ANSYS Workbench and Mechanical.', 'advanced', 'active'),
('mech_cfd_6w', 'CFD with ANSYS Fluent', 'cfd-ansys-fluent-6w', 'online', 'Mechanical', 'Prof. Naveen Reddy', 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=400', 349900, 499900, 'INR', '6 weeks', 'Master computational fluid dynamics, turbulence modeling, and heat transfer simulation.', 'advanced', 'active'),
('mech_robotics_6w', 'Robotics & Automation Fundamentals', 'robotics-automation-fundamentals-6w', 'online', 'Mechanical', 'Er. Kiran Kumar', 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400', 299900, 429900, 'INR', '6 weeks', 'Learn robotics basics, kinematics, dynamics, sensors, actuators, and automation systems.', 'intermediate', 'active')
ON CONFLICT (course_slug) DO NOTHING;

-- ============================================================================
-- MECHANICAL - INDUSTRIAL TRAINING
-- ============================================================================

-- 2 Week Industrial Training
INSERT INTO public.courses (course_id, course_title, course_slug, course_type, branch, instructor_name, course_image, price_cents, mrp_cents, currency, duration, description, skill_level, status) VALUES
('mech_it_machining_2w', 'Machining Workshop Training', 'machining-workshop-training-2w', 'industrial_training', 'Mechanical', 'Workshop Instructor', 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=400', 119900, 169900, 'INR', '2 weeks', 'Hands-on training on lathe, milling, drilling machines, and basic machining operations.', 'beginner', 'active')
ON CONFLICT (course_slug) DO NOTHING;

-- 4 Week Industrial Training
INSERT INTO public.courses (course_id, course_title, course_slug, course_type, branch, instructor_name, course_image, price_cents, mrp_cents, currency, duration, description, skill_level, status) VALUES
('mech_it_cad_4w', 'CAD/CAM Industrial Training', 'cad-cam-industrial-training-4w', 'industrial_training', 'Mechanical', 'CAD Engineer', 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=400', 269900, 379900, 'INR', '4 weeks', 'Industry CAD/CAM training with SolidWorks, CNC programming, and manufacturing projects.', 'intermediate', 'active'),
('mech_it_automobile_4w', 'Automobile Industry Training', 'automobile-industry-training-4w', 'industrial_training', 'Mechanical', 'Automotive Engineer', 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=400', 279900, 399900, 'INR', '4 weeks', 'Practical training in automobile systems, engine diagnostics, maintenance, and repair.', 'intermediate', 'active')
ON CONFLICT (course_slug) DO NOTHING;

-- 6 Week Industrial Training
INSERT INTO public.courses (course_id, course_title, course_slug, course_type, branch, instructor_name, course_image, price_cents, mrp_cents, currency, duration, description, skill_level, status) VALUES
('mech_it_manufacturing_6w', 'Manufacturing Systems Training', 'manufacturing-systems-training-6w', 'industrial_training', 'Mechanical', 'Production Manager', 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=400', 399900, 549900, 'INR', '6 weeks', 'Complete manufacturing training covering processes, quality control, lean, and automation.', 'advanced', 'active'),
('mech_it_hvac_6w', 'HVAC Systems Industrial Training', 'hvac-systems-industrial-training-6w', 'industrial_training', 'Mechanical', 'HVAC Specialist', 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=400', 379900, 529900, 'INR', '6 weeks', 'Industry HVAC training covering design, installation, commissioning, and maintenance.', 'advanced', 'active')
ON CONFLICT (course_slug) DO NOTHING;

-- ============================================================================
-- ELECTRICAL ENGINEERING - ONLINE COURSES
-- ============================================================================

-- 2 Week Online Courses
INSERT INTO public.courses (course_id, course_title, course_slug, course_type, branch, instructor_name, course_image, price_cents, mrp_cents, currency, duration, description, skill_level, status) VALUES
('eee_circuit_2w', 'Circuit Design Basics', 'circuit-design-basics-2w', 'online', 'Electrical', 'Er. Harish Menon', 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=400', 79900, 119900, 'INR', '2 weeks', 'Basic electrical circuits, Ohm law, Kirchhoff laws, and simple circuit analysis.', 'beginner', 'active')
ON CONFLICT (course_slug) DO NOTHING;

-- 4 Week Online Courses
INSERT INTO public.courses (course_id, course_title, course_slug, course_type, branch, instructor_name, course_image, price_cents, mrp_cents, currency, duration, description, skill_level, status) VALUES
('eee_matlab_4w', 'MATLAB for Electrical Engineers', 'matlab-electrical-engineers-4w', 'online', 'Electrical', 'Prof. Ankit Gupta', 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=400', 189900, 279900, 'INR', '4 weeks', 'MATLAB programming for circuit analysis, signal processing, and control systems.', 'intermediate', 'active'),
('eee_plc_4w', 'PLC Programming Fundamentals', 'plc-programming-fundamentals-4w', 'online', 'Electrical', 'Er. Ravi Shankar', 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=400', 219900, 319900, 'INR', '4 weeks', 'Learn PLC basics, ladder logic, function blocks, and industrial automation systems.', 'intermediate', 'active')
ON CONFLICT (course_slug) DO NOTHING;

-- 6 Week Online Courses
INSERT INTO public.courses (course_id, course_title, course_slug, course_type, branch, instructor_name, course_image, price_cents, mrp_cents, currency, duration, description, skill_level, status) VALUES
('eee_power_6w', 'Power System Analysis & Design', 'power-system-analysis-design-6w', 'online', 'Electrical', 'Dr. Kavita Sharma', 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=400', 299900, 449900, 'INR', '6 weeks', 'Study load flow, fault analysis, stability, protection systems, and smart grids.', 'advanced', 'active'),
('eee_renewable_6w', 'Renewable Energy Systems', 'renewable-energy-systems-6w', 'online', 'Electrical', 'Dr. Sunita Reddy', 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=400', 289900, 419900, 'INR', '6 weeks', 'Design solar PV, wind energy systems, battery storage, and grid integration.', 'intermediate', 'active')
ON CONFLICT (course_slug) DO NOTHING;

-- ============================================================================
-- ELECTRICAL - INDUSTRIAL TRAINING
-- ============================================================================

-- 2 Week Industrial Training
INSERT INTO public.courses (course_id, course_title, course_slug, course_type, branch, instructor_name, course_image, price_cents, mrp_cents, currency, duration, description, skill_level, status) VALUES
('eee_it_wiring_2w', 'Electrical Wiring & Installation', 'electrical-wiring-installation-2w', 'industrial_training', 'Electrical', 'Electrician Instructor', 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=400', 109900, 159900, 'INR', '2 weeks', 'Hands-on training in residential/industrial wiring, panels, MCBs, and safety practices.', 'beginner', 'active')
ON CONFLICT (course_slug) DO NOTHING;

-- 4 Week Industrial Training
INSERT INTO public.courses (course_id, course_title, course_slug, course_type, branch, instructor_name, course_image, price_cents, mrp_cents, currency, duration, description, skill_level, status) VALUES
('eee_it_substation_4w', 'Substation Maintenance Training', 'substation-maintenance-training-4w', 'industrial_training', 'Electrical', 'Substation Engineer', 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=400', 259900, 369900, 'INR', '4 weeks', 'Practical training in substation equipment, transformers, switchgear, and maintenance.', 'intermediate', 'active')
ON CONFLICT (course_slug) DO NOTHING;

-- 6 Week Industrial Training
INSERT INTO public.courses (course_id, course_title, course_slug, course_type, branch, instructor_name, course_image, price_cents, mrp_cents, currency, duration, description, skill_level, status) VALUES
('eee_it_scada_6w', 'SCADA & Automation Industrial Training', 'scada-automation-industrial-training-6w', 'industrial_training', 'Electrical', 'Automation Engineer', 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=400', 399900, 559900, 'INR', '6 weeks', 'Industry training in SCADA systems, HMI, PLC integration, and industrial automation.', 'advanced', 'active')
ON CONFLICT (course_slug) DO NOTHING;

-- ============================================================================
-- ELECTRONICS & COMMUNICATION - ONLINE COURSES
-- ============================================================================

-- 2 Week Online Courses
INSERT INTO public.courses (course_id, course_title, course_slug, course_type, branch, instructor_name, course_image, price_cents, mrp_cents, currency, duration, description, skill_level, status) VALUES
('ece_arduino_2w', 'Arduino Programming Basics', 'arduino-programming-basics-2w', 'online', 'ECE', 'Er. Kiran Kumar', 'https://images.unsplash.com/photo-1553406830-ef2513450d76?w=400', 79900, 119900, 'INR', '2 weeks', 'Learn Arduino programming, sensors, actuators, and build simple electronic projects.', 'beginner', 'active')
ON CONFLICT (course_slug) DO NOTHING;

-- 4 Week Online Courses
INSERT INTO public.courses (course_id, course_title, course_slug, course_type, branch, instructor_name, course_image, price_cents, mrp_cents, currency, duration, description, skill_level, status) VALUES
('ece_embedded_4w', 'Embedded Systems with ARM', 'embedded-systems-arm-4w', 'online', 'ECE', 'Er. Neha Gupta', 'https://images.unsplash.com/photo-1553406830-ef2513450d76?w=400', 229900, 329900, 'INR', '4 weeks', 'Learn ARM microcontrollers, embedded C, GPIO, timers, interrupts, and RTOS basics.', 'intermediate', 'active'),
('ece_iot_4w', 'IoT Application Development', 'iot-application-development-4w', 'online', 'ECE', 'Dr. Ajay Verma', 'https://images.unsplash.com/photo-1553406830-ef2513450d76?w=400', 219900, 319900, 'INR', '4 weeks', 'Build IoT apps using ESP32, sensors, MQTT, cloud platforms, and mobile integration.', 'intermediate', 'active')
ON CONFLICT (course_slug) DO NOTHING;

-- 6 Week Online Courses
INSERT INTO public.courses (course_id, course_title, course_slug, course_type, branch, instructor_name, course_image, price_cents, mrp_cents, currency, duration, description, skill_level, status) VALUES
('ece_vlsi_6w', 'VLSI Design & Verification', 'vlsi-design-verification-6w', 'online', 'ECE', 'Dr. Prakash Iyer', 'https://images.unsplash.com/photo-1553406830-ef2513450d76?w=400', 329900, 479900, 'INR', '6 weeks', 'Digital VLSI design, Verilog HDL, FPGA, synthesis, timing analysis, and verification.', 'advanced', 'active'),
('ece_dsp_6w', 'Digital Signal Processing', 'digital-signal-processing-6w', 'online', 'ECE', 'Prof. Meera Nair', 'https://images.unsplash.com/photo-1553406830-ef2513450d76?w=400', 299900, 429900, 'INR', '6 weeks', 'DSP algorithms, filters, FFT, transforms, and implementation using MATLAB/C.', 'advanced', 'active'),
('ece_pcb_6w', 'PCB Design & Fabrication', 'pcb-design-fabrication-6w', 'online', 'ECE', 'Er. Rohit Mehta', 'https://images.unsplash.com/photo-1553406830-ef2513450d76?w=400', 279900, 399900, 'INR', '6 weeks', 'Learn PCB design with Altium/KiCAD, schematic capture, layout, routing, and manufacturing.', 'intermediate', 'active')
ON CONFLICT (course_slug) DO NOTHING;

-- ============================================================================
-- ECE - INDUSTRIAL TRAINING
-- ============================================================================

-- 2 Week Industrial Training
INSERT INTO public.courses (course_id, course_title, course_slug, course_type, branch, instructor_name, course_image, price_cents, mrp_cents, currency, duration, description, skill_level, status) VALUES
('ece_it_electronics_2w', 'Electronics Workshop Training', 'electronics-workshop-training-2w', 'industrial_training', 'ECE', 'Lab Technician', 'https://images.unsplash.com/photo-1553406830-ef2513450d76?w=400', 99900, 149900, 'INR', '2 weeks', 'Hands-on training in basic electronics, soldering, testing equipment, and circuit building.', 'beginner', 'active')
ON CONFLICT (course_slug) DO NOTHING;

-- 4 Week Industrial Training
INSERT INTO public.courses (course_id, course_title, course_slug, course_type, branch, instructor_name, course_image, price_cents, mrp_cents, currency, duration, description, skill_level, status) VALUES
('ece_it_embedded_4w', 'Embedded Systems Industrial Training', 'embedded-systems-industrial-training-4w', 'industrial_training', 'ECE', 'Embedded Engineer', 'https://images.unsplash.com/photo-1553406830-ef2513450d76?w=400', 289900, 419900, 'INR', '4 weeks', 'Industry training in embedded C, ARM, RTOS, communication protocols, and projects.', 'intermediate', 'active')
ON CONFLICT (course_slug) DO NOTHING;

-- 6 Week Industrial Training
INSERT INTO public.courses (course_id, course_title, course_slug, course_type, branch, instructor_name, course_image, price_cents, mrp_cents, currency, duration, description, skill_level, status) VALUES
('ece_it_telecom_6w', 'Telecom Industry Training', 'telecom-industry-training-6w', 'industrial_training', 'ECE', 'Telecom Engineer', 'https://images.unsplash.com/photo-1553406830-ef2513450d76?w=400', 379900, 529900, 'INR', '6 weeks', 'Complete telecom training covering GSM, LTE, 5G, RF engineering, and network optimization.', 'advanced', 'active'),
('ece_it_vlsi_6w', 'VLSI Industry Training', 'vlsi-industry-training-6w', 'industrial_training', 'ECE', 'VLSI Design Engineer', 'https://images.unsplash.com/photo-1553406830-ef2513450d76?w=400', 429900, 599900, 'INR', '6 weeks', 'Industry VLSI training with real chip design, verification tools, and tapeout projects.', 'advanced', 'active')
ON CONFLICT (course_slug) DO NOTHING;
