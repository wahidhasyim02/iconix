import { buildStyledSvg } from '~/utils/svgEngine';
import type { IconStyleVariant } from '~/types/icon';

export default defineNuxtPlugin(async () => {
  if (typeof window === 'undefined') return;

  try {
    const res = await fetch('/icons.json');
    if (!res.ok) return;
    const data = await res.json();
    const list = Array.isArray(data) ? data : data.icons || [];
    const map = new Map(list.map((i: any) => [i.name, i.svg]));

    if (!customElements.get('ix-icon')) {
      class IxIcon extends HTMLElement {
        private _rendering = false;

        static get observedAttributes() {
          return [
            'name',
            'size',
            'variant',
            'stroke',
            'stroke-width',
            'color',
            'primary',
            'tone',
            'secondary',
            'secondary-color',
            'opacity',
          ];
        }

        connectedCallback() {
          this.render();
        }

        attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null) {
          if (oldValue === newValue) return;
          if (name === 'style') return;
          this.render();
        }

        render() {
          if (this._rendering) return;
          this._rendering = true;

          try {
            let name = this.getAttribute('name');
            if (!name) return;
            name = name.replace(/^(iconix:|ix:|gv:)/, '');
            const raw = map.get(name);
            if (!raw) return;

            let variant: IconStyleVariant = 'linear';
            const candidate = (
              this.getAttribute('variant') ||
              this.getAttribute('mode') ||
              ''
            ).trim();

            if (candidate === 'solid' || candidate === 'bold') {
              variant = 'solid';
            } else if (candidate === 'line-duotone' || candidate === 'line-dualtone') {
              variant = 'line-duotone';
            } else if (candidate === 'duotone' || candidate === 'dualtone') {
              variant = 'duotone';
            } else if (candidate === 'duotone-linear' || candidate === 'dualtone-linear') {
              variant = 'duotone-linear';
            } else {
              variant = 'linear';
            }

            const size = parseInt(this.getAttribute('size') || '24', 10) || 24;
            const strokeWidth =
              parseFloat(this.getAttribute('stroke') || this.getAttribute('stroke-width') || '2') || 2;
            const primaryColor = this.getAttribute('color') || this.getAttribute('primary') || 'currentColor';
            const secondaryColor =
              this.getAttribute('tone') || this.getAttribute('secondary') || this.getAttribute('secondary-color') || primaryColor;
            const duotoneOpacity = parseFloat(this.getAttribute('opacity') || '0.25') || 0.25;

            const styled = buildStyledSvg(raw, variant, {
              size,
              strokeWidth,
              primaryColor,
              secondaryColor,
              duotoneOpacity,
            });

            this.innerHTML = styled;
            this.style.display = 'inline-flex';
            this.style.verticalAlign = 'middle';
            this.style.width = `${size}px`;
            this.style.height = `${size}px`;
          } finally {
            this._rendering = false;
          }
        }
      }

      customElements.define('ix-icon', IxIcon);
      if (!customElements.get('iconix-icon')) {
        customElements.define('iconix-icon', class extends IxIcon {});
      }
      if (!customElements.get('gv-icon')) {
        customElements.define('gv-icon', class extends IxIcon {});
      }
    }
  } catch (err) {
    console.error('Failed to register <ix-icon>:', err);
  }
});
