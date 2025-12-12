-- Add MRP (Maximum Retail Price) column to courses table
-- This allows showing both MRP and discounted price

ALTER TABLE public.courses 
ADD COLUMN IF NOT EXISTS mrp_cents INTEGER;

-- Add a comment to explain the column
COMMENT ON COLUMN public.courses.mrp_cents IS 'Maximum Retail Price in cents (paise). Discounted price is in price_cents.';
