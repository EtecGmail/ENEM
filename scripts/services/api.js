(function () {
  const DEFAULT_ENDPOINTS = {
    signup: '/api/v1/users',
    assignPlan: '/api/v1/user-plans',
    registerConsent: '/api/v1/consents',
    submitEssay: '/api/v1/essays',
    listEssays: '/api/v1/essays',
    listPlans: '/api/v1/plans',
    emitEvent: '/api/v1/events'
  };

  const DEFAULT_DELAY = 600;

  function normalizePayload(payload) {
    if (!payload) return {};
    if (typeof FormData !== 'undefined' && payload instanceof FormData) {
      return Object.fromEntries(payload.entries());
    }
    if (Array.isArray(payload)) {
      return Object.fromEntries(payload);
    }
    if (typeof payload === 'object') {
      return payload;
    }
    return {};
  }

  function createFetchTransport(fetchImpl) {
    return async function transport(method, url, body) {
      const response = await fetchImpl(url, {
        method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: body ? JSON.stringify(body) : undefined
      });

      const data = await response.json().catch(() => ({}));
      return {
        status: response.status,
        data
      };
    };
  }

  function createMockTransport(delay = DEFAULT_DELAY) {
    let userCounter = 0;
    return async function transport(method, url, body) {
      return new Promise(resolve => {
        setTimeout(() => {
          const safeBody = body || {};
          if (url.includes('/users') && method === 'POST') {
            userCounter += 1;
            resolve({
              status: 201,
              data: {
                data: {
                  id: `usr_mock_${String(userCounter).padStart(4, '0')}`,
                  email: safeBody.email,
                  plano: safeBody.plano || 'essencial',
                  status_verificacao: 'pendente'
                }
              }
            });
            return;
          }

          if (url.includes('/consents') && method === 'POST') {
            resolve({
              status: 201,
              data: {
                data: {
                  id: `cns_mock_${Date.now()}`,
                  registrado_em: new Date().toISOString()
                }
              }
            });
            return;
          }

          if (url.includes('/user-plans') && method === 'POST') {
            resolve({
              status: 200,
              data: {
                data: {
                  plano: safeBody.plano,
                  vigencia_inicio: new Date().toISOString()
                }
              }
            });
            return;
          }

          if (url.includes('/essays') && method === 'POST') {
            resolve({
              status: 202,
              data: {
                data: {
                  id: `esy_mock_${Date.now()}`,
                  status: 'em_correcao'
                }
              }
            });
            return;
          }

          if (url.includes('/essays') && method === 'GET') {
            resolve({
              status: 200,
              data: {
                data: []
              }
            });
            return;
          }

          if (url.includes('/plans') && method === 'GET') {
            resolve({
              status: 200,
              data: {
                data: [
                  { id: 'essencial', monthlyEssayLimit: 2, correctionSlaHours: 96 },
                  { id: 'avancado', monthlyEssayLimit: 4, correctionSlaHours: 72 },
                  { id: 'premium', monthlyEssayLimit: 6, correctionSlaHours: 48 }
                ]
              }
            });
            return;
          }

          if (url.includes('/events') && method === 'POST') {
            resolve({
              status: 202,
              data: {
                data: {
                  id: `evt_mock_${Date.now()}`,
                  status: 'recebido'
                }
              }
            });
            return;
          }

          resolve({ status: 200, data: { data: safeBody } });
        }, delay);
      });
    };
  }

  function createApiService(options = {}) {
    const endpoints = { ...DEFAULT_ENDPOINTS, ...(options.endpoints || {}) };
    const fetchImpl = options.fetch || (typeof fetch !== 'undefined' ? fetch : null);
    const useMock = options.useMock !== undefined ? options.useMock : !fetchImpl;
    const transport = useMock
      ? createMockTransport(options.delay || DEFAULT_DELAY)
      : createFetchTransport(fetchImpl);

    return {
      async signup(payload) {
        const body = normalizePayload(payload);
        return transport('POST', endpoints.signup, body);
      },
      async assignPlan(payload) {
        const body = normalizePayload(payload);
        return transport('POST', endpoints.assignPlan, body);
      },
      async registerConsent(payload) {
        const body = normalizePayload(payload);
        return transport('POST', endpoints.registerConsent, body);
      },
      async submitEssay(payload) {
        const body = normalizePayload(payload);
        return transport('POST', endpoints.submitEssay, body);
      },
      async listEssays(params = {}) {
        if (useMock) {
          return transport('GET', endpoints.listEssays, params);
        }
        const query = new URLSearchParams(params).toString();
        const url = query ? `${endpoints.listEssays}?${query}` : endpoints.listEssays;
        return transport('GET', url);
      },
      async listPlans() {
        return transport('GET', endpoints.listPlans);
      },
      async emitEvent(payload) {
        const body = normalizePayload(payload);
        return transport('POST', endpoints.emitEvent, body);
      }
    };
  }

  if (typeof window !== 'undefined') {
    window.createApiService = createApiService;
    window.apiService = createApiService({ useMock: true });
  }

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
      createApiService,
      DEFAULT_ENDPOINTS
    };
  }
})();
