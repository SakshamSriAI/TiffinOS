-- ==============================================================================
-- TIFFINOS – SEED DATA FOR SUPABASE
-- Sets up default business profile for Shree Annapurna Tiffin Service
-- ==============================================================================

-- Note: Replace '00000000-0000-0000-0000-000000000000' with your actual Supabase auth.users ID
-- or run after signing up as the owner in Supabase Auth.

DO $$
DECLARE
    owner_id UUID;
BEGIN
    SELECT id INTO owner_id FROM auth.users LIMIT 1;
    
    IF owner_id IS NOT NULL THEN
        -- Insert Business Settings
        INSERT INTO public.business_settings (
            user_id,
            business_name,
            owner_name,
            phone,
            whatsapp_number,
            upi_id,
            address,
            default_lunch_price,
            default_dinner_price,
            lunch_cutoff,
            dinner_cutoff,
            operating_days
        ) VALUES (
            owner_id,
            'Shree Annapurna Tiffin Service',
            'Saksham Srivastava',
            '+91 98260 55432',
            '+91 98260 55432',
            'annapurnatiffin@okaxis',
            'Plot 44, Kailash Nagar, Indore, Madhya Pradesh 452001',
            110.00,
            120.00,
            '11:00 AM',
            '06:30 PM',
            '{"mon": true, "tue": true, "wed": true, "thu": true, "fri": true, "sat": true, "sun": false}'::JSONB
        ) ON CONFLICT (user_id) DO NOTHING;
    END IF;
END $$;
