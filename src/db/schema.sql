-- Main Entities
CREATE TABLE IF NOT EXISTS businesses (
    id TEXT PRIMARY KEY NOT NULL,
    name TEXT NOT NULL,
    categories TEXT,
    phone TEXT,
    whatsapp TEXT NOT NULL,
    address TEXT,
    city TEXT NOT NULL,
    lat REAL,
    lng REAL,
    hours TEXT,
    price_band TEXT,
    photos TEXT,
    verified BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW() -- Corrected
);

CREATE TABLE IF NOT EXISTS reviews (
    id TEXT PRIMARY KEY NOT NULL,
    business_id TEXT NOT NULL,
    user_id TEXT NOT NULL,
    rating INTEGER NOT NULL CHECK(rating >= 1 AND rating <= 5),
    text TEXT,
    photos TEXT,
    status TEXT DEFAULT 'pending',
    created_at TIMESTAMPTZ DEFAULT NOW(), -- Corrected
    FOREIGN KEY (business_id) REFERENCES businesses (id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS promos (
    id TEXT PRIMARY KEY NOT NULL,
    business_id TEXT NOT NULL,
    title TEXT NOT NULL,
    "desc" TEXT,
    starts_at TEXT NOT NULL,
    ends_at TEXT NOT NULL,
    active BOOLEAN DEFAULT true,
    FOREIGN KEY (business_id) REFERENCES businesses (id) ON DELETE CASCADE
);

-- User & Admin Entities
CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY NOT NULL,
    email TEXT UNIQUE,
    phone TEXT UNIQUE,
    role TEXT DEFAULT 'consumer'
);

CREATE TABLE IF NOT EXISTS claims (
    id TEXT PRIMARY KEY NOT NULL,
    business_id TEXT NOT NULL,
    user_id TEXT NOT NULL,
    method TEXT NOT NULL,
    status TEXT DEFAULT 'pending',
    evidence_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(), -- Corrected
    FOREIGN KEY (business_id) REFERENCES businesses (id),
    FOREIGN KEY (user_id) REFERENCES users (id)
);