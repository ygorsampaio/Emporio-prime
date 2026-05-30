-- ============================================================
--  EMPÓRIO PRIME — Schema completo
--  Execute no SQL Editor: supabase.com → seu projeto → SQL Editor
-- ============================================================

-- ============================================================
--  1. TABELA: products
--     image_url agora aponta para URL pública do Supabase Storage
-- ============================================================
CREATE TABLE IF NOT EXISTS products (
  id          BIGSERIAL PRIMARY KEY,
  name        TEXT          NOT NULL,
  category    TEXT          NOT NULL CHECK (category IN ('temperos','naturais','suplementos','descartaveis')),
  tag         TEXT          NOT NULL,
  description TEXT          NOT NULL,
  weight      TEXT          NOT NULL,
  price       DECIMAL(10,2) NOT NULL,
  old_price   DECIMAL(10,2),
  image_url   TEXT          NOT NULL,  -- URL pública do Supabase Storage
  is_new      BOOLEAN       DEFAULT FALSE,
  is_sale     BOOLEAN       DEFAULT FALSE,
  active      BOOLEAN       DEFAULT TRUE,
  created_at  TIMESTAMPTZ   DEFAULT NOW()
);

ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Qualquer visitante pode ler produtos ativos
CREATE POLICY "Leitura pública de produtos ativos"
  ON products FOR SELECT
  USING (active = TRUE);

-- ============================================================
--  2. TABELA: orders  (cabeçalho do pedido)
-- ============================================================
CREATE TABLE IF NOT EXISTS orders (
  id          BIGSERIAL PRIMARY KEY,
  total       DECIMAL(10,2) NOT NULL,
  status      TEXT          NOT NULL DEFAULT 'pending'
                            CHECK (status IN ('pending','confirmed','cancelled')),
  created_at  TIMESTAMPTZ   DEFAULT NOW()
);

ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Qualquer visitante pode criar um pedido (INSERT)
CREATE POLICY "Inserção pública de pedidos"
  ON orders FOR INSERT
  WITH CHECK (true);

-- ============================================================
--  3. TABELA: order_items  (itens de cada pedido)
-- ============================================================
CREATE TABLE IF NOT EXISTS order_items (
  id          BIGSERIAL PRIMARY KEY,
  order_id    BIGINT        NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_id  BIGINT        NOT NULL REFERENCES products(id),
  product_name TEXT         NOT NULL,  -- snapshot: guarda o nome no momento da compra
  quantity    INT           NOT NULL CHECK (quantity > 0),
  unit_price  DECIMAL(10,2) NOT NULL,  -- snapshot: preço no momento da compra
  created_at  TIMESTAMPTZ   DEFAULT NOW()
);

ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;

-- Qualquer visitante pode inserir itens (junto com o pedido)
CREATE POLICY "Inserção pública de itens de pedido"
  ON order_items FOR INSERT
  WITH CHECK (true);

-- ============================================================
--  4. SEED: 14 temperos
--     Troque image_url pelo link público do seu Storage depois
--     Formato: https://SEU_PROJECT.supabase.co/storage/v1/object/public/products/nome-do-arquivo.jpg
-- ============================================================
INSERT INTO products (name, category, tag, description, weight, price, old_price, image_url, is_new, is_sale) VALUES
  ('Caldo de Carne',       'temperos', 'Caldo',      'Carne e gordura bovina, sal, especiarias, amido de milho, realçador de sabor, corantes e conservantes.',            '60g', 8.90,  NULL, '/images/caldo-carne.jpg',      false, false),
  ('Páprica Defumada',     'temperos', 'Defumado',   'Obtida de pimentões vermelhos secos e defumados. Confere sabor e aroma característico a diversos pratos.',           '50g', 7.90,  NULL, '/images/paprica-defumada.jpg', true,  false),
  ('Bicarbonato de Sódio', 'temperos', 'Culinário',  'Multiuso na cozinha: fermento natural em bolos, neutralizador de acidez e amaciante de carnes.',                    '70g', 6.90,  NULL, '/images/bicarbonato.jpg',      false, false),
  ('Colorau (Urucum)',     'temperos', 'Colorífico', 'Milho, óleo de soja e urucum. Sem glúten e sem lactose. Corante natural para dar aquela cor especial.',              '50g', 5.90,  NULL, '/images/colorau.jpg',          false, false),
  ('Lemon Pepper',         'temperos', 'Blend',      'Sal, açafrão, cebola granulada, pimenta do reino, coentro e ácido cítrico. Perfeito para frango e peixes.',          '50g', 8.90,  NULL, '/images/lemon-pepper.jpg',     false, false),
  ('Páprica Doce',         'temperos', 'Suave',      'Proveniente de pimentões macerados, maduros e dessecados. Ótima em peixes, aves, batata e molhos.',                  '50g', 7.90,  NULL, '/images/paprica-doce.jpg',     false, false),
  ('Páprica Picante',      'temperos', 'Picante',    'Pimentões secos e moídos, pimenta, farinha de milho e urucum. Para quem gosta de ardência.',                         '50g', 7.90,  NULL, '/images/paprica-picante.jpg',  false, false),
  ('Tempero Edu Guedes',   'temperos', 'Especial',   'Sal, cebola, cenoura, pimentão, açafrão, salsa, cebolinha, amido de milho, orégano e aroma de costela.',             '50g', 9.90,  NULL, '/images/edu-guedes.jpg',       true,  false),
  ('Chimichurri',          'temperos', 'Churrasco',  'Cebola, alho, salsa, pimentão, orégano, cebolinha, mostarda, tomate, manjericão, louro e noz moscada.',              '50g', 9.90,  NULL, '/images/chimichurri.jpg',      false, false),
  ('Amaciante de Carne',   'temperos', 'Amaciante',  'Sal, alho pó, cebola pó, pimenta, salsa e glutamato monossódico. Deixa sua carne macia e saborosa.',                 '60g', 8.90,  NULL, '/images/amaciante-carne.jpg',  false, false),
  ('Orégano',              'temperos', 'Erva',       'Erva aromática com sabor intenso e picante, com notas de menta e limão. Ideal para pizzas e massas.',                '20g', 4.90,  NULL, '/images/oregano.jpg',          false, false),
  ('Açafrão da Terra',     'temperos', 'Colorífico', 'Amido de milho, Açafrão da Terra e óleo vegetal. Popular na culinária indiana e em diversas cozinhas.',              '50g', 7.90,  NULL, '/images/acafrao.jpg',          false, false),
  ('Caldo de Galinha',     'temperos', 'Caldo',      'Carne e gordura de galinha, sal, especiarias, amido de milho, realçador de sabor e conservantes.',                   '60g', 8.90,  NULL, '/images/caldo-galinha.jpg',    false, false),
  ('Tempero Ana Maria',    'temperos', 'Especial',   'Alho frito, alho granulado, cebola desidratada, manjericão, manjerona, orégano, pimentão, salsa e tomilho.',         '50g', 9.90,  NULL, '/images/ana-maria.jpg',        true,  false);
