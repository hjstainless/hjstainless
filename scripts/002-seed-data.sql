-- Seed admin user (password: admin123)
INSERT INTO admins (username, password_hash) VALUES
('admin', '$2a$10$8K1p/a0dL1LXMIgoEDFrwOfMQkJQ2OeijQRCPb7rOy8.V.VFmKqTa')
ON CONFLICT (username) DO NOTHING;

-- Seed product categories
INSERT INTO product_categories (name_zh, name_en, slug, description_zh, description_en, sort_order) VALUES
('预制件', 'Prefabricated Parts', 'prefabricated', '专业管道预制加工，包括弯头预制、三通预制、管道组件预制等，满足石油化工、电力能源等行业的高标准要求。', 'Professional pipe prefabrication including elbow, tee and pipe assembly prefabrication, meeting high standards for petrochemical and power energy industries.', 1),
('对焊管件', 'Butt Weld Fittings', 'butt-weld', '弯头、三通、异径管、管帽等对焊管件系列，采用优质原材料，精密锻造工艺。', 'Elbows, tees, reducers, caps and other butt weld fitting series, using premium raw materials with precision forging processes.', 2),
('锻造法兰', 'Forged Flanges', 'flanges', '平焊法兰、对焊法兰、承插焊法兰、盲板等系列产品，符合ASME、EN、GB等国际国内标准。', 'Slip-on, weld neck, socket weld flanges, blind flanges and more, compliant with ASME, EN, GB international and domestic standards.', 3),
('管件', 'Pipe Fittings', 'fittings', '各类标准及非标管道配件，包括弯头、三通、四通、异径管等。', 'Various standard and non-standard pipe fittings including elbows, tees, crosses, reducers and more.', 4)
ON CONFLICT (slug) DO NOTHING;

-- Seed products
INSERT INTO products (category_id, name_zh, name_en, slug, description_zh, description_en, specs_zh, specs_en, material, pressure_rating, is_featured, sort_order) VALUES
(1, '管道预制弯头组件', 'Prefabricated Elbow Assembly', 'prefab-elbow-assembly', '采用先进的预制技术，将弯头与直管段进行精密焊接组装，大幅缩短现场安装周期。', 'Using advanced prefabrication technology, precisely welding elbow and straight pipe sections together, significantly reducing on-site installation time.', '规格: DN50-DN1200\n壁厚: SCH10-SCH160\n标准: ASME B31.3', 'Size: DN50-DN1200\nWall Thickness: SCH10-SCH160\nStandard: ASME B31.3', '304/316L/双相钢', 'PN10-PN420', true, 1),
(1, '三通预制管段', 'Prefabricated Tee Section', 'prefab-tee-section', '高精度三通预制管段，适用于各类工艺管道系统。', 'High-precision prefabricated tee sections suitable for various process piping systems.', '规格: DN25-DN600\n壁厚: SCH10-SCH80\n标准: ASME B16.9', 'Size: DN25-DN600\nWall Thickness: SCH10-SCH80\nStandard: ASME B16.9', '304/316L/321', 'PN10-PN160', true, 2),
(2, '不锈钢弯头', 'Stainless Steel Elbow', 'ss-elbow', '90度和45度不锈钢弯头，表面光洁，焊接性能优良。', '90-degree and 45-degree stainless steel elbows with smooth surface and excellent weldability.', '规格: DN15-DN1200\n角度: 45°/90°/180°\n标准: ASME B16.9', 'Size: DN15-DN1200\nAngle: 45°/90°/180°\nStandard: ASME B16.9', '304/316/316L/321/347', 'PN10-PN420', true, 1),
(2, '不锈钢三通', 'Stainless Steel Tee', 'ss-tee', '等径三通和异径三通，可根据客户需求定制。', 'Equal tees and reducing tees, customizable according to customer requirements.', '规格: DN15-DN600\n类型: 等径/异径\n标准: ASME B16.9', 'Size: DN15-DN600\nType: Equal/Reducing\nStandard: ASME B16.9', '304/316L/双相钢', 'PN10-PN420', false, 2),
(2, '不锈钢异径管', 'Stainless Steel Reducer', 'ss-reducer', '同心异径管和偏心异径管，精密加工，尺寸准确。', 'Concentric and eccentric reducers with precision machining and accurate dimensions.', '规格: DN25×DN15-DN600×DN400\n类型: 同心/偏心\n标准: ASME B16.9', 'Size: DN25×DN15-DN600×DN400\nType: Concentric/Eccentric\nStandard: ASME B16.9', '304/316L', 'PN10-PN160', false, 3),
(3, '对焊法兰', 'Weld Neck Flange', 'wn-flange', '锻造对焊法兰，高颈设计提供优良的抗疲劳性能。', 'Forged weld neck flanges with high neck design providing excellent fatigue resistance.', '规格: DN15-DN600\n压力: Class150-Class2500\n标准: ASME B16.5', 'Size: DN15-DN600\nPressure: Class150-Class2500\nStandard: ASME B16.5', '304/316L/F51', 'Class 150-2500', true, 1),
(3, '平焊法兰', 'Slip-On Flange', 'so-flange', '锻造平焊法兰，安装便捷，经济实用。', 'Forged slip-on flanges, easy installation, economical and practical.', '规格: DN15-DN600\n压力: Class150-Class600\n标准: ASME B16.5', 'Size: DN15-DN600\nPressure: Class150-Class600\nStandard: ASME B16.5', '304/316L/碳钢', 'Class 150-600', false, 2),
(4, '管帽', 'Pipe Cap', 'pipe-cap', '不锈钢管帽，用于管道末端封堵。', 'Stainless steel pipe caps for pipe end closure.', '规格: DN15-DN1200\n标准: ASME B16.9', 'Size: DN15-DN1200\nStandard: ASME B16.9', '304/316L', 'PN10-PN160', false, 1)
ON CONFLICT (slug) DO NOTHING;

-- Seed articles
INSERT INTO articles (title_zh, title_en, slug, summary_zh, summary_en, content_zh, content_en, category, published_at) VALUES
('泓基金属参加2024年上海国际石化展览会', 'Hongji Metal Attended 2024 Shanghai International Petrochemical Exhibition', 'shanghai-expo-2024', '我公司携全系列不锈钢管件产品亮相2024上海国际石化展览会，获得国内外客户广泛关注。', 'Our company showcased full range of stainless steel pipe fittings at the 2024 Shanghai International Petrochemical Exhibition, attracting widespread attention from domestic and international customers.', '2024年11月15日，江苏泓基金属材料有限公司参加了在上海举办的国际石化技术装备展览会。本次展会汇聚了全球500多家企业，我公司展出了预制件、对焊管件、锻造法兰等全系列产品，产品质量获得多家国际采购商的高度认可。', 'On November 15, 2024, Jiangsu Hongji Metal Materials Co., Ltd. participated in the International Petrochemical Technology and Equipment Exhibition held in Shanghai. The exhibition gathered over 500 companies worldwide. Our company exhibited a full range of products including prefabricated parts, butt weld fittings, and forged flanges, with product quality highly recognized by multiple international purchasers.', 'news', '2024-11-20'),
('不锈钢管件常见材质及应用场景解析', 'Analysis of Common Stainless Steel Pipe Fitting Materials and Applications', 'ss-materials-guide', '本文详细介绍304、316L、321、双相钢等常见不锈钢材质的化学成分、力学性能及适用工况。', 'This article details the chemical composition, mechanical properties and applicable conditions of common stainless steel materials such as 304, 316L, 321, and duplex steel.', '在管道工程中，选择合适的不锈钢材质至关重要。304不锈钢是最常用的奥氏体不锈钢，具有良好的耐腐蚀性和加工性能；316L在304基础上添加了钼元素，耐氯离子腐蚀能力显著提升；321添加了钛元素，抗晶间腐蚀性能更佳；双相钢则兼具奥氏体和铁素体的优点，强度更高。', 'In pipeline engineering, choosing the right stainless steel material is crucial. 304 stainless steel is the most commonly used austenitic stainless steel with good corrosion resistance and processability; 316L adds molybdenum to 304, significantly improving chloride corrosion resistance; 321 adds titanium for better intergranular corrosion resistance; duplex steel combines the advantages of austenite and ferrite for higher strength.', 'knowledge', '2024-10-15'),
('全球LNG市场持续增长，管道配件需求旺盛', 'Global LNG Market Continues to Grow, Strong Demand for Pipeline Fittings', 'lng-market-growth', '随着全球清洁能源转型加速，LNG市场规模持续扩大，带动上游管道配件行业快速发展。', 'As global clean energy transition accelerates, the LNG market continues to expand, driving rapid development of upstream pipeline fittings industry.', '据行业报告显示，2024年全球LNG贸易量达到4.3亿吨，同比增长6.5%。中国、印度等亚洲国家LNG进口量持续增长，大量LNG接收站项目正在建设中。这为管道配件企业带来了巨大的市场机遇，对低温合金钢管件的需求尤为旺盛。', 'According to industry reports, global LNG trade volume reached 430 million tons in 2024, a year-on-year increase of 6.5%. LNG imports from Asian countries such as China and India continue to grow, with numerous LNG receiving terminal projects under construction. This brings enormous market opportunities for pipeline fittings companies, with particularly strong demand for cryogenic alloy steel fittings.', 'industry', '2024-09-28')
ON CONFLICT (slug) DO NOTHING;

-- Seed site settings
INSERT INTO settings (key, value_zh, value_en) VALUES
('company_phone', '+86-515-8888-8888', '+86-515-8888-8888'),
('company_fax', '+86-515-8888-8889', '+86-515-8888-8889'),
('company_email', 'info@hongjimetal.com', 'info@hongjimetal.com'),
('company_address', '江苏省盐城市东台市经济开发区', 'Economic Development Zone, Dongtai City, Yancheng, Jiangsu, China'),
('icp_number', '苏ICP备XXXXXXXX号', 'Su ICP No. XXXXXXXX')
ON CONFLICT (key) DO NOTHING;
