import { createClient } from '@supabase/supabase-js';

type CustomFields = {
    supabaseUrl?: string;
    supabasePublishableKey?: string;
};

export function createSupabaseBrowserClient(customFields: CustomFields) {
    const supabaseUrl = customFields.supabaseUrl;
    const supabaseKey = customFields.supabasePublishableKey;

    if (!supabaseUrl || !supabaseKey) {
        throw new Error('Variables Supabase manquantes dans customFields.');
    }

    return createClient(supabaseUrl, supabaseKey);
}