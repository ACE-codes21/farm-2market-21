
CREATE OR REPLACE FUNCTION public.decrement_product_stock(items_to_buy jsonb)
RETURNS void AS $$
DECLARE
    item RECORD;
    product_stock INT;
BEGIN
    -- This transaction block ensures that either all stock updates succeed, or none do.
    -- First, check if all items in the order have enough stock.
    FOR item IN SELECT * FROM jsonb_to_recordset(items_to_buy) AS x(id uuid, quantity int) LOOP
        SELECT stock INTO product_stock FROM products WHERE id = item.id FOR UPDATE;
        IF product_stock < item.quantity THEN
            RAISE EXCEPTION 'Not enough stock for product ID %', item.id;
        END IF;
    END LOOP;

    -- If all stock checks pass, proceed to decrement the stock for each item.
    FOR item IN SELECT * FROM jsonb_to_recordset(items_to_buy) AS x(id uuid, quantity int) LOOP
        UPDATE products
        SET stock = stock - item.quantity
        WHERE id = item.id;
    END LOOP;
END;
$$ LANGUAGE plpgsql;
