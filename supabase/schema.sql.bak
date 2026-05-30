-- ============================================================
--  Execute no SQL Editor do seu projeto Supabase
--  https://supabase.com → seu projeto → SQL Editor
-- ============================================================

CREATE TABLE IF NOT EXISTS products (
  id          BIGSERIAL PRIMARY KEY,
  name        TEXT NOT NULL,
  category    TEXT NOT NULL CHECK (category IN ('temperos','naturais','suplementos','descartaveis')),
  tag         TEXT NOT NULL,
  description TEXT NOT NULL,
  weight      TEXT NOT NULL,
  price       DECIMAL(10,2) NOT NULL,
  old_price   DECIMAL(10,2),
  image_url   TEXT NOT NULL,
  is_new      BOOLEAN DEFAULT FALSE,
  is_sale     BOOLEAN DEFAULT FALSE,
  active      BOOLEAN DEFAULT TRUE,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- Row Level Security: garante que só leituras públicas são permitidas
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Leitura pública de produtos ativos"
  ON products FOR SELECT
  USING (active = TRUE);

-- ============================================================
--  SEED: 14 temperos da loja
-- ============================================================
INSERT INTO products (name, category, tag, description, weight, price, image_url, is_new) VALUES
  ('Caldo de Carne',       'temperos', 'Caldo',      'Carne e gordura bovina, sal, especiarias, amido de milho, realçador de sabor, corantes e conservantes.', '60g', 8.90, '/images/caldo-carne.jpg',      false),
  ('Páprica Defumada',     'temperos', 'Defumado',   'Obtida de pimentões vermelhos secos e defumados. Confere sabor e aroma característico a diversos pratos.', '50g', 7.90, '/images/paprica-defumada.jpg', true),
  ('Bicarbonato de Sódio', 'temperos', 'Culinário',  'Multiuso na cozinha: fermento natural em bolos, neutralizador de acidez e amaciante de carnes.', '70g', 6.90, '/images/bicarbonato.jpg',        false),
  ('Colorau (Urucum)',     'temperos', 'Colorífico', 'Milho, óleo de soja e urucum. Sem glúten e sem lactose. Corante natural para dar aquela cor especial.', '50g', 5.90, '/images/colorau.jpg',           false),
  ('Lemon Pepper',         'temperos', 'Blend',      'Sal, açafrão, cebola granulada, pimenta do reino, coentro e ácido cítrico. Perfeito para frango e peixes.', '50g', 8.90, '/images/lemon-pepper.jpg',  false),
  ('Páprica Doce',         'temperos', 'Suave',      'Proveniente de pimentões macerados, maduros e dessecados. Ótima em peixes, aves, batata e molhos.', '50g', 7.90, '/images/paprica-doce.jpg',       false),
  ('Páprica Picante',      'temperos', 'Picante',    'Pimentões secos e moídos, pimenta, farinha de milho e urucum. Para quem gosta de ardência.', '50g', 7.90, '/images/paprica-picante.jpg',        false),
  ('Tempero Edu Guedes',   'temperos', 'Especial',   'Sal, cebola, cenoura, pimentão, açafrão, salsa, cebolinha, amido de milho, orégano e aroma de costela.', '50g', 9.90, '/images/edu-guedes.jpg',    true),
  ('Chimichurri',          'temperos', 'Churrasco',  'Cebola, alho, salsa, pimentão, orégano, cebolinha, mostarda, tomate, manjericão, louro e noz moscada.', '50g', 9.90, '/images/chimichurri.jpg',     false),
  ('Amaciante de Carne',   'temperos', 'Amaciante',  'Sal, alho pó, cebola pó, pimenta, salsa e glutamato monossódico. Deixa sua carne macia e saborosa.', '60g', 8.90, '/images/amaciante-carne.jpg',   false),
  ('Orégano',              'temperos', 'Erva',       'Erva aromática com sabor intenso e picante, com notas de menta e limão. Ideal para pizzas e massas.', '20g', 4.90, '/images/oregano.jpg',            false),
  ('Açafrão da Terra',     'temperos', 'Colorífico', 'Amido de milho, Açafrão da Terra e óleo vegetal. Popular na culinária indiana e em diversas cozinhas.', '50g', 7.90, '/images/acafrao.jpg',        false),
  ('Caldo de Galinha',     'temperos', 'Caldo',      'Carne e gordura de galinha, sal, especiarias, amido de milho, realçador de sabor e conservantes.', '60g', 8.90, '/images/caldo-galinha.jpg',       false),
  ('Tempero Ana Maria',    'temperos', 'Especial',   'Alho frito, alho granulado, cebola desidratada, manjericão, manjerona, orégano, pimentão, salsa e tomilho.', '50g', 9.90, '/images/ana-maria.jpg',  true);
