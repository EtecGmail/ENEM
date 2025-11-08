# Modelo de dados (MVP)

```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nome_completo TEXT NOT NULL,
  email CITEXT UNIQUE NOT NULL,
  senha_hash TEXT NOT NULL,
  plano_atual TEXT REFERENCES plans(id),
  status_verificacao TEXT NOT NULL DEFAULT 'pendente',
  criado_em TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  atualizado_em TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE plans (
  id TEXT PRIMARY KEY,
  nome TEXT NOT NULL,
  monthly_essay_limit SMALLINT,
  correction_sla_hours SMALLINT,
  support_channels JSONB NOT NULL DEFAULT '[]'::jsonb,
  ativo BOOLEAN NOT NULL DEFAULT TRUE,
  criado_em TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE user_plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  usuario_id UUID REFERENCES users(id) ON DELETE CASCADE,
  plano_id TEXT REFERENCES plans(id),
  vigencia_inicio TIMESTAMPTZ NOT NULL,
  vigencia_fim TIMESTAMPTZ,
  motivo TEXT,
  criado_em TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE consents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  usuario_id UUID REFERENCES users(id) ON DELETE CASCADE,
  versao_termo TEXT NOT NULL,
  base_legal TEXT NOT NULL,
  aceito_em TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  ip INET,
  user_agent TEXT,
  origem TEXT NOT NULL
);

CREATE TABLE essays (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  usuario_id UUID REFERENCES users(id) ON DELETE CASCADE,
  plano_id TEXT REFERENCES plans(id),
  tema TEXT,
  formato_envio TEXT NOT NULL,
  arquivo_url TEXT,
  conteudo TEXT,
  status TEXT NOT NULL DEFAULT 'em_correcao',
  nota_total SMALLINT,
  competencias JSONB,
  plano_de_acao JSONB,
  enviado_em TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  corrigido_em TIMESTAMPTZ
);

CREATE TABLE audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  entidade TEXT NOT NULL,
  entidade_id UUID,
  acao TEXT NOT NULL,
  payload JSONB,
  executado_por UUID,
  origem TEXT,
  criado_em TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nome TEXT NOT NULL,
  payload JSONB NOT NULL,
  status TEXT NOT NULL DEFAULT 'recebido',
  recebido_em TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  processado_em TIMESTAMPTZ
);
```

> **Índices sugeridos**
> - `users(email)` único (já contemplado).
> - `essays(usuario_id, status)` para consulta por aluno.
> - `events(status)` para reprocessamento.
