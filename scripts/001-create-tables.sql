-- 管理员表
CREATE TABLE IF NOT EXISTS admins (
  id SERIAL PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- 轮播图表
CREATE TABLE IF NOT EXISTS banners (
  id SERIAL PRIMARY KEY,
  title_zh VARCHAR(255),
  title_en VARCHAR(255),
  subtitle_zh VARCHAR(255),
  subtitle_en VARCHAR(255),
  image_url VARCHAR(500),
  link VARCHAR(500),
  sort_order INT DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW()
);

-- 产品分类表
CREATE TABLE IF NOT EXISTS product_categories (
  id SERIAL PRIMARY KEY,
  name_zh VARCHAR(100) NOT NULL,
  name_en VARCHAR(100) NOT NULL,
  slug VARCHAR(100) UNIQUE NOT NULL,
  description_zh TEXT,
  description_en TEXT,
  image_url VARCHAR(500),
  sort_order INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);

-- 产品表
CREATE TABLE IF NOT EXISTS products (
  id SERIAL PRIMARY KEY,
  category_id INT REFERENCES product_categories(id),
  name_zh VARCHAR(200) NOT NULL,
  name_en VARCHAR(200) NOT NULL,
  slug VARCHAR(200) UNIQUE NOT NULL,
  description_zh TEXT,
  description_en TEXT,
  specs_zh TEXT,
  specs_en TEXT,
  image_url VARCHAR(500),
  images TEXT[],
  material VARCHAR(100),
  pressure_rating VARCHAR(100),
  is_featured BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);

-- 新闻/文章表
CREATE TABLE IF NOT EXISTS articles (
  id SERIAL PRIMARY KEY,
  title_zh VARCHAR(255) NOT NULL,
  title_en VARCHAR(255),
  slug VARCHAR(255) UNIQUE NOT NULL,
  summary_zh TEXT,
  summary_en TEXT,
  content_zh TEXT,
  content_en TEXT,
  cover_image VARCHAR(500),
  category VARCHAR(50) DEFAULT 'news',
  is_active BOOLEAN DEFAULT true,
  published_at TIMESTAMP DEFAULT NOW(),
  created_at TIMESTAMP DEFAULT NOW()
);

-- 留言表
CREATE TABLE IF NOT EXISTS messages (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  company VARCHAR(200),
  email VARCHAR(200),
  phone VARCHAR(50),
  content TEXT NOT NULL,
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW()
);

-- 网站设置表
CREATE TABLE IF NOT EXISTS settings (
  id SERIAL PRIMARY KEY,
  key VARCHAR(100) UNIQUE NOT NULL,
  value_zh TEXT,
  value_en TEXT,
  updated_at TIMESTAMP DEFAULT NOW()
);
