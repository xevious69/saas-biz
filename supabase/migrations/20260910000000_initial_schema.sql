-- Application tables belong in versioned migrations. This initial migration
-- intentionally creates no product-specific data model.
create extension if not exists pgcrypto with schema extensions;
