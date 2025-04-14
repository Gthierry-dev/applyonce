-- Create category_fields table
CREATE TABLE IF NOT EXISTS public.category_fields (
    id BIGSERIAL PRIMARY KEY,
    category_id UUID NOT NULL REFERENCES public.categories(id) ON DELETE CASCADE,
    label TEXT NOT NULL,
    name TEXT NOT NULL,
    type TEXT NOT NULL,
    placeholder TEXT,
    required BOOLEAN DEFAULT false,
    options TEXT[],
    min INTEGER,
    max INTEGER,
    step INTEGER,
    "order" INTEGER NOT NULL DEFAULT 0,
    validation_rules JSONB,
    conditional_field JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_category_fields_category_id ON public.category_fields(category_id);
CREATE INDEX IF NOT EXISTS idx_category_fields_order ON public.category_fields("order");

-- Enable RLS
ALTER TABLE public.category_fields ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Allow read access to all users" ON public.category_fields
    FOR SELECT USING (true);

CREATE POLICY "Allow insert access to authenticated users" ON public.category_fields
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Allow update access to authenticated users" ON public.category_fields
    FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Allow delete access to authenticated users" ON public.category_fields
    FOR DELETE USING (auth.role() = 'authenticated');

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER handle_category_fields_updated_at
    BEFORE UPDATE ON public.category_fields
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at(); 