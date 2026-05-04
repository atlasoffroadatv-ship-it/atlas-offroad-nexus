-- Recreate trigger to auto-assign admin role to all new auth users
DROP TRIGGER IF EXISTS on_auth_user_created_admin ON auth.users;

CREATE TRIGGER on_auth_user_created_admin
AFTER INSERT ON auth.users
FOR EACH ROW
EXECUTE FUNCTION public.handle_new_user_admin();

-- Backfill: grant admin role to any existing auth users that don't have it
INSERT INTO public.user_roles (user_id, role)
SELECT id, 'admin'::public.app_role FROM auth.users
ON CONFLICT (user_id, role) DO NOTHING;