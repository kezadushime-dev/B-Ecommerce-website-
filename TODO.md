# TODO: Update Product.insert.tsx to Match Backend Schema

## Tasks

- [x] Update state variables to include only schema fields: name, description, price, category (string), vendorId (string), inStock (boolean), stock (number), images (string[])
- [x] Modify the form JSX to remove unnecessary sections (variants, specifications, SKU, barcode, pricing summary, etc.) and add inputs for the required fields
- [x] Update handleSubmit to collect form data matching the schema and send to createProduct
- [x] Remove unused imports and components (e.g., Variant interface, variant-related logic, SpecRow, etc.)
- [ ] Test the updated form to ensure it submits correctly
