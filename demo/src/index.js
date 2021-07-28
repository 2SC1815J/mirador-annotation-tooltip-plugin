import mirador from 'mirador';
import miradorAnnotationTooltipPlugins from '../../src';

const config = {
  id: 'demo',
  windows: [{
    loadedManifest: 'https://iiif.harvardartmuseums.org/manifests/object/299843',
  }],
  // windows: [{
  //   loadedManifest: 'https://dzkimgs.l.u-tokyo.ac.jp/videos/cat2020/manifest.json',
  // }],
  // eslint-disable-next-line sort-keys
  catalog: [
    { manifestId: 'https://dzkimgs.l.u-tokyo.ac.jp/videos/cat2020/manifest.json' },
    { manifestId: 'https://dzkimgs.l.u-tokyo.ac.jp/videos/iiif_in_japan_2017/manifest.json' },
    { manifestId: 'https://iiif.harvardartmuseums.org/manifests/object/299843' },
  ],
  window: {
    defaultSideBarPanel: 'annotations',
    sideBarOpenByDefault: true,
  },
};

// eslint-disable-next-line no-unused-vars
const miradorInstance = mirador.viewer(config, [...miradorAnnotationTooltipPlugins]);
