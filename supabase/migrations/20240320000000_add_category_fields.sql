-- Create category_fields table
CREATE TABLE IF NOT EXISTS category_fields (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    category_id UUID NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
    label TEXT NOT NULL,
    type TEXT NOT NULL CHECK (type IN ('text', 'textarea', 'number', 'select', 'checkbox', 'date', 'file', 'url')),
    required BOOLEAN NOT NULL DEFAULT false,
    placeholder TEXT,
    options JSONB,
    order INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create index on category_id for faster lookups
CREATE INDEX IF NOT EXISTS idx_category_fields_category_id ON category_fields(category_id);

-- Create trigger to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = TIMEZONE('utc'::text, NOW());
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_category_fields_updated_at
    BEFORE UPDATE ON category_fields
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Add RLS policies
ALTER TABLE category_fields ENABLE ROW LEVEL SECURITY;

-- Allow admins to manage category fields
CREATE POLICY "Admins can manage category fields"
    ON category_fields
    FOR ALL
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM profiles
            WHERE profiles.id = auth.uid()
            AND profiles.role = 'admin'
        )
    );

-- Allow users to view category fields
CREATE POLICY "Users can view category fields"
    ON category_fields
    FOR SELECT
    TO authenticated
    USING (true); 