# Checklist de testes

## Funcional
- [ ] CTAs (hero, header, cta final, sticky) levam à seção de ofertas.
- [ ] Botões de oferta abrem o link correto da Sympla em nova aba.
- [ ] UTMs presentes na URL (ex.: abrir `/?utm_source=teste&utm_campaign=x` e checar o link da Sympla).
- [ ] `?ref=` propagado para o checkout.
- [ ] Formulário de lead: valida nome/WhatsApp/consentimento; tela de sucesso aparece.
- [ ] `/obrigado`: add-to-calendar (Google e .ics) e onboarding enviam.
- [ ] `/indique`: WhatsApp, LinkedIn e copiar link funcionam.
- [ ] Banner LGPD: "Recusar" não injeta scripts; "Aceitar" injeta GA4/Pixel; escolha persiste.

## Analytics (com DebugView / Pixel Helper)
- [ ] page_view, view_event, scroll_*, view_pricing, select_ticket, initiate_checkout, lead, faq_open, share_event.
- [ ] **Nenhum** `purchase` disparado por clique.

## Responsividade (larguras)
- [ ] 320 / 360 / 390 / 412 / 768 / desktop — sem cortes, texto legível, sticky CTA no mobile.

## Performance/SEO (Lighthouse)
- [ ] LCP/CLS/INP saudáveis; imagens otimizadas; sem layout shift.
- [ ] Title, description, canonical, OG e JSON-LD presentes.

## Acessibilidade
- [ ] Contraste ok; foco visível; labels em inputs; `aria-expanded` no FAQ.
