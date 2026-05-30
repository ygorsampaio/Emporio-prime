-- Adiciona política SELECT em orders para usuários anônimos poderem
-- recuperar o próprio pedido recém-criado (necessário para buscar o ID)
CREATE POLICY "Leitura pública de pedidos"
  ON orders FOR SELECT
  USING (true);

-- Garante que a política de INSERT em order_items também existe
-- (rode só se ainda não tiver criado as tabelas)
-- CREATE POLICY "Inserção pública de itens de pedido"
--   ON order_items FOR INSERT
--   WITH CHECK (true);
