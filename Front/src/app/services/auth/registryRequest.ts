export interface RegistryRequest{
  username?: string,
  password?: string,
  email?: string,
  first_name?: string,
  last_name?: string,
  number?: string,
  is_superuser?: boolean,
  is_staff?: boolean,
  is_active?: boolean
}