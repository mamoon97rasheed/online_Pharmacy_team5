
-- Users (Admin + Members)
CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('ADMIN', 'MEMBER') DEFAULT 'MEMBER',
    status ENUM('ACTIVE', 'DISABLED') DEFAULT 'ACTIVE',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Members
CREATE TABLE members (
    member_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100),
    phone VARCHAR(20),
    address TEXT,
    approved BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

-- Drugs
CREATE TABLE drugs (
    drug_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    quantity_available INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Cart Items
CREATE TABLE cart_items (
    cart_item_id INT AUTO_INCREMENT PRIMARY KEY,
    member_id INT,
    drug_id INT,
    quantity INT,
    added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (member_id) REFERENCES members(member_id),
    FOREIGN KEY (drug_id) REFERENCES drugs(drug_id)
);

-- Orders
CREATE TABLE orders (
    order_id INT AUTO_INCREMENT PRIMARY KEY,
    member_id INT,
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    total_price DECIMAL(10,2),
    FOREIGN KEY (member_id) REFERENCES members(member_id)
);

-- Order Items
CREATE TABLE order_items (
    order_item_id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT,
    drug_id INT,
    quantity INT,
    price_each DECIMAL(10,2),
    FOREIGN KEY (order_id) REFERENCES orders(order_id),
    FOREIGN KEY (drug_id) REFERENCES drugs(drug_id)
);

-- Sample Data
INSERT INTO users (username, password, role, status) VALUES
('admin', 'admin123', 'ADMIN', 'ACTIVE'),
('john_doe', 'john123', 'MEMBER', 'ACTIVE');

INSERT INTO members (user_id, name, email, phone, address, approved) VALUES
(2, 'John Doe', 'john@example.com', '9876543210', '123 Street, City', TRUE);

INSERT INTO drugs (name, description, price, quantity_available) VALUES
('Paracetamol', 'Used to treat pain and fever.', 25.50, 100),
('Amoxicillin', 'Antibiotic used to treat infections.', 120.00, 50),
('Ibuprofen', 'Anti-inflammatory drug.', 75.00, 80);
('Paracetamol', 'Used to treat pain and fever.', 25.50, 100),
('Amoxicillin', 'Antibiotic used to treat infections.', 120.00, 50),
('Ibuprofen', 'Anti-inflammatory drug.', 75.00, 80),
('Cetirizine', 'Antihistamine for allergies.', 45.00, 60),
('Metformin', 'Used for type 2 diabetes.', 150.00, 40),
('Atorvastatin', 'Lowers cholesterol.', 200.00, 35),
('Azithromycin', 'Antibiotic for bacterial infections.', 180.00, 25),
('Omeprazole', 'Reduces stomach acid, for ulcers/GERD.', 95.00, 70),
('Amlodipine', 'Used for high blood pressure.', 110.00, 50),
('Losartan', 'Treats high blood pressure and heart failure.', 130.00, 45),
('Salbutamol', 'Inhaler for asthma.', 85.00, 30),
('Prednisolone', 'Steroid for inflammation.', 160.00, 20),
('Diclofenac', 'Pain reliever and anti-inflammatory.', 90.00, 65),
('Clopidogrel', 'Prevents blood clots.', 210.00, 25),
('Insulin', 'Used for diabetes treatment.', 500.00, 15);

