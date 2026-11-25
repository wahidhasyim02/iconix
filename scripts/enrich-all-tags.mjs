import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dataIconsDir = path.resolve(__dirname, '../data/icons');
const files = fs.readdirSync(dataIconsDir).filter((f) => f.endsWith('.json'));

const TAG_DICTIONARY = {
  // Devices & Tech
  chart: ['chart', 'graph', 'analytics', 'statistics', 'diagram', 'data', 'metrics', 'report', 'visual', 'grafik', 'statistik', 'data'],
  candlestick: ['candlestick', 'crypto', 'stocks', 'trading', 'finance', 'forex', 'market', 'chart', 'saham', 'trading'],
  cctv: ['cctv', 'surveillance', 'camera', 'security', 'monitor', 'protection', 'video', 'kamera-keamanan', 'pengawas'],
  gauge: ['gauge', 'meter', 'speed', 'performance', 'indicator', 'dashboard', 'speedometer'],
  speedometer: ['speedometer', 'speed', 'velocity', 'gauge', 'meter', 'fast', 'performance', 'kecepatan'],
  kanban: ['kanban', 'board', 'tasks', 'scrum', 'agile', 'project', 'workflow', 'cards'],
  'case-lower': ['case-lower', 'lowercase', 'small', 'letter', 'font', 'typography', 'text', 'huruf-kecil'],
  'case-upper': ['case-upper', 'uppercase', 'capital', 'caps', 'letter', 'font', 'typography', 'text', 'huruf-besar'],
  'letter-spacing': ['letter-spacing', 'tracking', 'kerning', 'typography', 'font', 'spacing', 'spasi-huruf'],
  'whole-word': ['whole-word', 'word', 'search', 'match', 'find', 'text', 'typography', 'kata'],
  arrow: ['arrow', 'pointer', 'direction', 'navigation', 'move', 'point', 'long', 'panah', 'arah', 'petunjuk'],
  calendar: ['calendar', 'date', 'schedule', 'event', 'month', 'year', 'day', 'planner', 'agenda', 'kalender', 'jadwal'],
  lens: ['lens', 'camera', 'optic', 'glass', 'zoom', 'focus', 'photo'],
  bot: ['bot', 'robot', 'ai', 'artificial-intelligence', 'assistant', 'chat', 'automation', 'agent', 'machine'],
  tv: ['television', 'screen', 'display', 'monitor', 'media', 'broadcast', 'entertainment', 'video'],
  monitor: ['screen', 'display', 'desktop', 'computer', 'pc', 'hardware', 'workstation'],
  laptop: ['notebook', 'computer', 'pc', 'macbook', 'portable', 'device', 'screen', 'hardware', 'work'],
  smartphone: ['phone', 'mobile', 'cellphone', 'device', 'iphone', 'android', 'touchscreen', 'responsive'],
  tablet: ['ipad', 'tablet', 'screen', 'device', 'touchscreen', 'portable', 'mobile'],
  pc: ['computer', 'tower', 'desktop', 'workstation', 'system-unit', 'cpu', 'hardware'],
  speaker: ['audio', 'sound', 'volume', 'music', 'multimedia', 'acoustic', 'stereo', 'hardware'],
  audio: ['audio', 'sound', 'waveform', 'frequency', 'music', 'volume', 'voice', 'suara', 'gelombang-suara', 'bunyi'],
  waveform: ['waveform', 'audio', 'sound', 'frequency', 'spectrum', 'equalizer', 'gelombang'],
  headphones: ['headphones', 'headset', 'audio', 'music', 'sound', 'earphones', 'listen', 'headphone', 'musik', 'dengar'],
  headset: ['headset', 'headphones', 'customer-service', 'support', 'call-center', 'operator', 'mic', 'gaming', 'bantuan'],
  microphone: ['microphone', 'mic', 'audio', 'record', 'voice', 'speech', 'sound', 'podcast', 'suara', 'rekam'],
  image: ['image', 'photo', 'picture', 'graphic', 'gallery', 'media', 'thumbnail', 'foto', 'gambar'],
  images: ['images', 'photos', 'pictures', 'gallery', 'media', 'collection', 'album', 'galeri', 'gambar'],
  upscale: ['upscale', 'enhance', 'high-resolution', 'super-resolution', 'hd', 'ai', 'perjelas', 'perbesar'],
  braces: ['braces', 'curly-brackets', 'code', 'json', 'syntax', 'programming', 'developer', 'kurung-kurawal'],
  brackets: ['brackets', 'square-brackets', 'code', 'array', 'syntax', 'programming', 'developer', 'kurung-siku'],
  spreadsheet: ['spreadsheet', 'excel', 'sheets', 'table', 'data', 'cells', 'csv', 'tabel'],
  terminal: ['terminal', 'cli', 'console', 'bash', 'command', 'prompt', 'developer', 'perintah'],
  corrupted: ['corrupted', 'broken', 'error', 'damaged', 'invalid', 'rusak'],
  'text-cursor': ['cursor', 'pointer', 'text', 'caret', 'i-beam', 'typing', 'ketik'],
  type: ['type', 'typography', 'font', 'text', 'letter', 'character', 'huruf', 'teks'],
  airplay: ['stream', 'cast', 'screen-share', 'wireless', 'audio', 'video', 'apple', 'connect', 'tv'],
  camera: ['photo', 'photography', 'lens', 'shutter', 'picture', 'capture', 'snapshot'],
  videocamera: ['video', 'camera', 'record', 'movie', 'film', 'camcorder', 'cinema', 'broadcast', 'stream'],

  // Emergency & Alerts
  siren: ['siren', 'emergency', 'police', 'ambulance', 'alert', 'warning', 'alarm', 'light', 'beacon', 'flasher', 'security'],
  sirine: ['siren', 'emergency', 'police', 'ambulance', 'alert', 'warning', 'alarm', 'light', 'beacon', 'flasher'],
  ambulance: ['ambulance', 'hospital', 'emergency', 'medical', 'doctor', 'healthcare', 'rescue', 'paramedic', 'clinic', 'vehicle'],
  bell: ['bell', 'notification', 'alert', 'alarm', 'reminder', 'chime', 'ring'],
  alarm: ['alarm', 'clock', 'time', 'timer', 'wake', 'watch', 'alert', 'bell', 'morning', 'schedule'],
  clock: ['clock', 'time', 'watch', 'timer', 'hour', 'minute', 'schedule', 'history', 'recent', 'countdown'],
  'alarm-smoke': ['smoke', 'fire', 'detector', 'sensor', 'safety', 'emergency', 'hazard', 'alert'],

  // Objects & Geometry
  bottle: ['bottle', 'drink', 'water', 'wine', 'glass', 'beverage', 'alcohol', 'container', 'botol', 'minuman'],
  milk: ['milk', 'dairy', 'drink', 'beverage', 'calcium', 'food', 'carton', 'susu', 'minuman'],
  'tube-lotion': ['tube', 'lotion', 'cream', 'cosmetic', 'skincare', 'beauty', 'ointment', 'krim', 'losion'],
  tube: ['tube', 'lotion', 'cream', 'cosmetic', 'skincare', 'beauty', 'ointment', 'krim', 'losion'],
  mirror: ['mirror', 'reflection', 'glass', 'surface', 'optics', 'vanity', 'look'],
  amphora: ['amphora', 'vase', 'pottery', 'antique', 'greek', 'roman', 'jar', 'ceramic', 'ancient', 'vessel', 'museum'],
  anchor: ['anchor', 'sea', 'ship', 'boat', 'marine', 'ocean', 'harbor', 'nautical', 'port', 'sail'],
  anvil: ['anvil', 'blacksmith', 'forge', 'heavy', 'craft', 'iron', 'metal', 'tool', 'workshop', 'steel'],
  angle: ['angle', 'degree', 'geometry', 'math', 'measure', 'corner', 'triangle'],
  antenna: ['antenna', 'signal', 'radio', 'wireless', 'broadcast', 'receiver', 'transmission', 'connectivity', 'telecom'],
  aperture: ['aperture', 'camera', 'lens', 'photo', 'photography', 'shutter', 'focus', 'iris', 'exposure', 'optic'],
  apple: ['apple', 'fruit', 'food', 'healthy', 'diet', 'organic', 'nutrition', 'snack'],
  cloud: ['cloud', 'clouds', 'weather', 'storage', 'server', 'sync', 'awan', 'cuaca', 'langit', 'mendung'],
  clouds: ['cloud', 'clouds', 'weather', 'overcast', 'awan', 'cuaca', 'langit', 'mendung'],
  rain: ['rain', 'rainfall', 'water', 'precipitation', 'weather', 'hujan', 'air', 'cuaca', 'gerimis'],
  snow: ['snow', 'snowfall', 'cold', 'winter', 'ice', 'weather', 'salju', 'dingin', 'es', 'musim-dingin'],
  fog: ['fog', 'mist', 'haze', 'weather', 'kabut', 'asap', 'cuaca'],
  drizzle: ['drizzle', 'rain', 'light-rain', 'weather', 'gerimis', 'rintik', 'hujan'],
  hail: ['hail', 'hailstorm', 'ice', 'weather', 'hujan-es', 'es', 'badai'],
  lightning: ['lightning', 'thunder', 'storm', 'electricity', 'power', 'weather', 'petir', 'kilat', 'badai', 'guntur'],
  wind: ['wind', 'breeze', 'storm', 'weather', 'angin', 'badai', 'hembusan'],
  triangle: ['triangle', 'triangel', 'delta', 'shape', 'segitiga', 'bentuk', 'geometri'],
  'exclamation-point': ['exclamation', 'alert', 'warning', 'important', 'caution', 'notice', 'attention', 'mark', 'point', 'tanda-seru', 'peringatan', 'perhatian', 'bahaya'],
  'question-mark': ['question', 'help', 'faq', 'ask', 'query', 'support', 'info', 'tanda-tanya', 'bantuan', 'tanya'],
  code: ['code', 'developer', 'coding', 'html', 'bracket', 'syntax', 'programming', 'dev', 'script', 'source', 'koding', 'pemrograman', 'kode', 'sumber'],
  'line-height': ['line-height', 'leading', 'spacing', 'typography', 'text', 'font', 'jarak-baris', 'spasi-baris', 'teks'],
  'air-vent': ['air-vent', 'ac', 'hvac', 'cooling', 'ventilation', 'fan', 'airflow', 'climate', 'temperature'],
  truck: ['truck', 'delivery', 'cargo', 'shipping', 'logistics', 'freight', 'transport', 'vehicle', 'haul'],
  car: ['car', 'automobile', 'vehicle', 'drive', 'transport', 'sedan', 'auto', 'road', 'mobil', 'kendaraan'],
  bus: ['bus', 'transit', 'public-transport', 'commute', 'vehicle', 'transportation', 'bis', 'angkutan'],
  funnel: ['funnel', 'filter', 'sort', 'refine', 'filter-list', 'saring', 'penyaring'],
  between: ['between', 'align', 'spacing', 'distribution', 'layout', 'margin', 'gap'],
  'message-square': ['message', 'square', 'chat', 'bubble', 'comment', 'dialog', 'text', 'sms', 'conversation', 'talk', 'pesan', 'obrolan'],
  'messages-square': ['messages', 'square', 'chat', 'bubble', 'comment', 'dialog', 'text', 'sms', 'conversation', 'talk', 'threads', 'pesan', 'obrolan'],

  // Design & Editing
  pen: ['pen', 'write', 'edit', 'draw', 'sketch', 'design', 'create', 'tool', 'author', 'compose'],
  pencil: ['pencil', 'write', 'edit', 'draw', 'sketch', 'design', 'create', 'tool', 'draft'],
  save: ['save', 'disk', 'floppy', 'storage', 'store', 'download', 'keep', 'backup', 'file'],
  trash: ['trash', 'delete', 'remove', 'bin', 'garbage', 'rubbish', 'waste', 'clear', 'recycle'],

  // Health & UI
  accessibility: ['accessibility', 'a11y', 'handicap', 'disabled', 'universal', 'inclusion', 'user', 'human', 'body'],
  activity: ['activity', 'pulse', 'heartbeat', 'ecg', 'cardio', 'fitness', 'health', 'vital', 'wave', 'monitor'],
  'app-window': ['window', 'application', 'browser', 'software', 'desktop', 'interface', 'ui', 'frame', 'screen'],
  'case-sensitive': ['case-sensitive', 'font', 'letter', 'caps', 'capital', 'typography', 'text', 'search', 'match'],

  // Search & Exploration
  search: ['search', 'find', 'query', 'magnifier', 'magnifying-glass', 'explore', 'lookup', 'seek', 'inspect', 'scan', 'filter', 'cari', 'temukan'],

  // Users & Profiles
  user: ['user', 'person', 'account', 'profile', 'member', 'avatar', 'human', 'people', 'individual', 'pengguna', 'akun'],
  users: ['users', 'people', 'team', 'group', 'crowd', 'members', 'community', 'pengguna'],
  group: ['group', 'team', 'users', 'people', 'community', 'organization', 'members', 'kelompok', 'tim'],

  // Home & Architecture
  house: ['house', 'home', 'building', 'dashboard', 'homepage', 'estate', 'property', 'residence', 'rumah', 'beranda'],
  houses: ['houses', 'village', 'neighborhood', 'homes', 'community', 'residence', 'estate'],

  // Security & Locks
  shield: ['shield', 'security', 'protect', 'protection', 'guard', 'defense', 'safety', 'secure', 'safe', 'tameng', 'keamanan'],
  lock: [
    'lock',
    'security',
    'keyhole',
    'secure',
    'padlock',
    'private',
    'privacy',
    'protect',
    'protection',
    'safety',
    'auth',
    'kunci',
    'gembok',
    'terkunci',
    'aman',
  ],
  key: [
    'key',
    'lock',
    'access',
    'secret',
    'password',
    'passkey',
    'passcode',
    'pin',
    'credential',
    'token',
    'security',
    'auth',
    'authentication',
    'login',
    'signin',
    'unlock',
    'permission',
    'license',
    'encryption',
    'private-key',
    'api-key',
    'kata-sandi',
    'sandi',
    'kunci',
    'akses',
  ],

  // Travel & Transport
  plane: ['plane', 'airplane', 'aeroplane', 'flight', 'fly', 'airport', 'travel', 'transport', 'pesawat', 'terbang'],
  airlines: ['airlines', 'airline', 'airplane', 'plane', 'flight', 'travel', 'aviation', 'wings', 'maskapai', 'pesawat', 'terbang', 'penerbangan', 'bandara', 'sayap'],

  // Layout, Grid & UI Containers
  grid: ['grid', 'layout', 'table', 'matrix', 'cells', 'kotak', 'susunan', 'tabel', 'petak', 'spreadsheet', 'baris-kolom', 'widget'],
  layout: ['layout', 'dashboard', 'template', 'view', 'workspace', 'interface', 'structure', 'tata-letak', 'kerangka', 'struktur', 'wireframe', 'desain', 'panel', 'widget', 'modul'],
  panel: ['panel', 'sidebar', 'drawer', 'sheet', 'dock', 'window', 'bilah', 'jendela', 'kompartemen', 'kolom', 'layout', 'widget', 'kontainer'],
  panels: ['panels', 'sidebar', 'drawer', 'sheet', 'dock', 'windows', 'bilah', 'jendela', 'multi-panel', 'kompartemen', 'layout', 'widget', 'modul'],
  columns: ['columns', 'grid', 'vertical', 'split', 'divide', 'layout', 'kolom', 'tata-letak', 'pembagian', 'multi-kolom'],
  gallery: ['gallery', 'images', 'photos', 'media', 'carousel', 'slider', 'thumbnails', 'showcase', 'galeri', 'gambar', 'foto', 'pratinjau', 'portofolio'],
  grip: ['grip', 'drag', 'handle', 'reorder', 'move', 'grab', 'sort', 'dots', 'geser', 'tarik', 'pegangan', 'urutkan'],
  gap: ['gap', 'spacing', 'margin', 'padding', 'space', 'distance', 'jarak', 'spasi', 'renggang', 'pemisah'],
  notification: ['notification', 'alert', 'notice', 'reminder', 'bell', 'pemberitahuan', 'notifikasi', 'pengingat'],

  // Power & Tech
  plug: ['plug', 'power', 'cable', 'connect', 'connection', 'electric', 'energy', 'socket', 'colokan', 'listrik'],

  // UI Elements & Badges
  heart: ['heart', 'love', 'like', 'favorite', 'health', 'romance', 'suka', 'favorit', 'hati'],
  flag: ['flag', 'mark', 'bookmark', 'report', 'banner', 'pennant', 'golf', 'triangle', 'country', 'bendera'],

  // Art & Design
  brush: ['brush', 'paint', 'draw', 'art', 'color', 'tool', 'kuas', 'lukis', 'design'],
  highlighter: ['highlighter', 'marker', 'pen', 'draw', 'highlight', 'text', 'stabilo', 'mark', 'color'],

  // Marketing & Commerce
  ad: ['ad', 'advertisement', 'advertising', 'promo', 'sponsor', 'marketing', 'campaign', 'commercial', 'iklan', 'promosi'],

  // Vehicles & Logistics
  van: ['van', 'vehicle', 'car', 'delivery', 'transport', 'cargo', 'shipping', 'automobile', 'mobil', 'kendaraan', 'kurir', 'ekspedisi'],

  // Files & Folders
  file: ['file', 'document', 'page', 'doc', 'paper', 'berkas', 'dokumen', 'sheet', 'draft'],
  files: ['files', 'documents', 'pages', 'docs', 'papers', 'berkas', 'dokumen', 'collection'],
  folder: ['folder', 'directory', 'archive', 'storage', 'files', 'map', 'direktori', 'arsip'],

  // Communication, Social & UI
  message: ['message', 'chat', 'comment', 'bubble', 'conversation', 'talk', 'sms', 'pesan', 'obrolan', 'komentar', 'diskusi'],
  mail: ['mail', 'email', 'envelope', 'letter', 'inbox', 'message', 'surat', 'pesan', 'surel', 'kirim', 'kontak'],
  phone: ['phone', 'telephone', 'call', 'contact', 'dial', 'telepon', 'panggilan', 'hubungi', 'kontak', 'ring'],
  send: ['send', 'paper-plane', 'flight', 'message', 'kirim', 'pesan', 'share'],
  reply: ['reply', 'back', 'respond', 'arrow', 'balas', 'kembali', 'respon'],
  share: ['share', 'sharing', 'connect', 'social', 'bagikan', 'sebar', 'network', 'tautan'],
  download: ['download', 'unduh', 'save', 'get', 'arrow-down', 'file', 'ambil', 'simpan'],
  upload: ['upload', 'unggah', 'send', 'arrow-up', 'file', 'kirim'],
  menu: ['menu', 'hamburger', 'navigation', 'options', 'lines', 'navigasi', 'daftar', 'opsi'],
  moon: ['moon', 'night', 'dark', 'dark-mode', 'crescent', 'malam', 'bulan', 'gelap', 'tidur'],
  sun: ['sun', 'sunny', 'light', 'brightness', 'day', 'solar', 'warmth', 'matahari', 'siang', 'terang', 'cerah'],
  star: ['star', 'favorite', 'rating', 'vip', 'premium', 'bintang', 'ulasan', 'favorit'],
  bookmark: ['bookmark', 'save', 'favorite', 'ribbon', 'mark', 'tag', 'baca', 'tandai', 'simpan'],
  charging: ['charging', 'charge', 'battery', 'power', 'electric', 'isi-daya', 'baterai', 'listrik'],
  text: ['text', 'typography', 'font', 'align', 'paragraph', 'teks', 'tulisan', 'huruf', 'format'],
  log: ['log', 'sign', 'account', 'auth', 'access', 'masuk', 'keluar'],
  wifi: ['wifi', 'wireless', 'network', 'internet', 'connection', 'hotspot', 'sinyal', 'jaringan', 'nirkabel', 'koneksi'],
  power: ['power', 'turn-off', 'on-off', 'shutdown', 'daya', 'listrik', 'daya-listrik', 'tombol-daya', 'energi'],
  medal: ['medal', 'award', 'trophy', 'winner', 'champion', 'achievement', 'badge', 'ribbon', 'medali', 'juara', 'penghargaan'],
  blocks: ['blocks', 'cube', 'modular', 'shapes', 'toy', 'balok', 'kotak', 'komponen', 'kubus', 'balok-susun'],
  refresh: ['refresh', 'reload', 'sync', 'repeat', 'putar', 'muat-ulang', 'segarkan', 'putar-balik', 'ulang'],
  play: ['play', 'start', 'resume', 'media', 'player', 'video', 'audio', 'putar', 'mulai'],
  pause: ['pause', 'hold', 'break', 'player', 'media', 'jeda', 'berhenti-sebentar'],
  fast: ['fast', 'forward', 'fast-forward', 'speed', 'cepat', 'maju-cepat'],
  skip: ['skip', 'jump', 'next', 'previous', 'lompat', 'lewati'],
  step: ['step', 'frame', 'advance', 'langkah'],
};

// Suffix modifier tags
const SUFFIX_DICTIONARY = {
  text: ['text', 'lines', 'content', 'tulisan', 'teks', 'paragraf', 'write'],
  closed: ['closed', 'locked', 'folder-closed', 'tertutup'],
  keyhole: ['keyhole', 'lock', 'security', 'access', 'auth', 'lubang-kunci', 'kunci'],
  check: ['check', 'done', 'success', 'verified', 'approved', 'ok', 'completed', 'tick', 'confirm', 'centang', 'selesai', 'benar', 'sukses', 'setuju', 'checklist'],
  plus: ['plus', 'add', 'create', 'new', 'insert', 'more', 'tambah', 'baru', 'buat'],
  minus: ['minus', 'remove', 'delete', 'exclude', 'reduce', 'less', 'kurang', 'hapus'],
  off: ['off', 'slash', 'disabled', 'turn-off', 'inactive', 'mute', 'mati', 'nonaktif', 'garis-miring', 'strip'],
  off2: ['off', 'disabled', 'silent', 'slash'],
  dot: ['dot', 'status', 'indicator', 'online', 'badge'],
  play: ['play', 'start', 'resume', 'video', 'player'],
  pause: ['pause', 'hold', 'break', 'player'],
  stop: ['stop', 'halt', 'end', 'square'],
  cloud: ['cloud', 'server', 'network', 'storage', 'sync', 'remote'],
  cog: ['cog', 'gear', 'settings', 'configuration', 'preferences', 'options', 'setup'],
  up: ['up', 'upload', 'arrow', 'outbound', 'send'],
  down: ['down', 'download', 'arrow', 'inbound', 'receive'],
  x: ['x', 'cancel', 'close', 'error', 'dismiss', 'reject', 'remove', 'delete', 'clear', 'silang', 'batal', 'tutup', 'hapus'],
  mac: ['mac', 'apple', 'imac', 'desktop', 'retina'],
  camera: ['camera', 'webcam', 'video', 'optic'],
  activity: ['activity', 'pulse', 'graph', 'health', 'vital'],
  sleep: ['sleep', 'night', 'snooze', 'bed', 'rest', 'nap', 'zzz'],
  ring: ['ring', 'alerting', 'vibrate', 'chime', 'active'],
  sparkles: ['sparkles', 'ai', 'magic', 'generate', 'prompt', 'assist', 'smart'],
  ruler: ['ruler', 'measure', 'precision', 'blueprint', 'draft'],
  square: ['square', 'form', 'document', 'note'],
  line: ['line', 'stroke', 'underline'],
  round: ['round', 'circle', 'circular'],
  oval: ['oval', 'ellipse', 'egg-shaped'],
  record: ['record', 'recording', 'dot', 'live', 'on-air'],
  'screen-share': ['screen-share', 'share', 'cast', 'stream', 'broadcast', 'airplay'],
  'screen-share-off': ['screen-share-off', 'stop-sharing', 'disabled'],
  code: ['code', 'developer', 'coding', 'html', 'bracket', 'syntax', 'programming', 'dev', 'script', 'source'],
  'exclamation-point': ['exclamation', 'alert', 'warning', 'important', 'caution', 'notice', 'attention', 'mark', 'point', 'peringatan'],
  fading: ['fading', 'history', 'recent', 'countdown', 'expire', 'expired', 'temporary', 'fade', 'schedule'],
  slash: ['slash', 'off', 'disabled', 'clear', 'cancel', 'strip', 'garis-miring', 'nonaktif', 'batal', 'mati', 'inactive'],
  dashed: ['dashed', 'dotted', 'placeholder', 'border', 'garis-putus', 'putus-putus'],
  close: ['close', 'hide', 'collapse', 'tutup', 'sembunyikan'],
  open: ['open', 'show', 'expand', 'buka', 'tampilkan'],
  start: ['start', 'first', 'left', 'beginning', 'awal', 'kiri'],
  end: ['end', 'last', 'right', 'akhir', 'kanan'],
  horizontal: ['horizontal', 'landscape', 'row', 'mendatar', 'baris', 'horizontal'],
  vertical: ['vertical', 'portrait', 'column', 'tegak', 'vertikal'],
  thumbnails: ['thumbnails', 'preview', 'grid', 'gallery', 'pratinjau', 'foto-kecil'],
  circles: ['circles', 'round', 'geometric', 'lingkaran', 'bulat'],
  'squares-circles': ['squares', 'circles', 'geometric', 'shapes', 'kotak-lingkaran'],
  clover: ['clover', 'flower', 'leaf', 'shape', 'daun', 'kelopak'],
  freeform: ['freeform', 'canvas', 'board', 'bebas', 'kanvas'],
  dashboard: ['dashboard', 'admin', 'panel', 'overview', 'ringkasan', 'dasbor'],
  template: ['template', 'preset', 'boilerplate', 'layout', 'cetak-biru'],
  'arrow-down': ['arrow-down', 'down', 'decrease', 'countdown'],
  'arrow-up': ['arrow-up', 'up', 'increase', 'fast-forward'],
  'arrow-left': ['arrow-left', 'left', 'rewind', 'back', 'undo', 'past'],
  'arrow-right': ['arrow-right', 'right', 'forward', 'next', 'future'],
  landing: ['landing', 'arrive', 'arrival', 'mendarat'],
  takeoff: ['takeoff', 'departure', 'depart', 'lepas-landas'],
  taxi: ['taxi', 'runway', 'ground', 'roll'],
  tilt: ['tilt', 'angle', 'maneuver', 'rotate'],
  side: ['side', 'profile', 'horizontal'],
  ban: ['ban', 'block', 'forbidden', 'prohibit', 'blokir'],
  half: ['half', 'split', 'partial', 'separuh'],
  corner: ['corner', 'edge', 'sudut'],
  'question-mark': ['question', 'help', 'faq', 'ask', 'query', 'bantuan', 'tanya'],
  ellipsis: ['ellipsis', 'more', 'options', 'dots', 'menu'],
  open: ['open', 'unlocked', 'access', 'terbuka'],
  collaboration: ['collaboration', 'collab', 'partnership', 'teamwork', 'cooperation', 'kerjasama'],
  star: ['star', 'favorite', 'rating', 'vip', 'premium', 'bintang'],
  golf: ['golf', 'sport', 'hole', 'green'],
  triangle: ['triangle', 'triangel', 'delta', 'shape'],
  triangel: ['triangle', 'triangel', 'delta', 'shape'],
  pen: ['pen', 'write', 'edit', 'draw', 'sketch', 'design', 'tulis', 'edit-user'],
  lock: ['lock', 'security', 'secure', 'protect', 'kunci', 'gembok'],
  key: ['key', 'access', 'secret', 'password', 'passkey', 'credential', 'auth', 'token', 'kunci', 'sandi'],
  shield: ['shield', 'security', 'protect', 'protection', 'guard', 'safety', 'tameng', 'keamanan'],
  search: ['search', 'find', 'query', 'explore', 'lookup', 'cari'],
  house: ['house', 'home', 'building', 'property', 'rumah'],
  plug: ['plug', 'power', 'connect', 'electric', 'colokan', 'listrik'],
  crack: ['crack', 'broken', 'broken-heart', 'damage', 'split', 'patah', 'kecewa'],
  pulse: ['pulse', 'heartbeat', 'activity', 'ecg', 'cardio', 'health', 'vital', 'detak-jantung'],
  brush: ['brush', 'paint', 'draw', 'kuas', 'lukis'],
  drizzle: ['drizzle', 'rain', 'weather', 'gerimis', 'rintik'],
  fog: ['fog', 'mist', 'haze', 'weather', 'kabut'],
  hail: ['hail', 'ice', 'weather', 'hujan-es'],
  lightning: ['lightning', 'storm', 'petir', 'kilat', 'badai'],
  snow: ['snow', 'cold', 'winter', 'ice', 'salju', 'dingin'],
  rain: ['rain', 'water', 'weather', 'hujan', 'air'],
  wind: ['wind', 'storm', 'weather', 'angin', 'badai'],
  'rain-wind': ['rain', 'wind', 'storm', 'hujan-angin', 'badai'],
  'cloud-lightning': ['lightning', 'storm', 'thunder', 'petir', 'kilat', 'badai'],
  xml: ['xml', 'html', 'markup', 'code', 'syntax'],
  indent: ['indent', 'tab', 'spacing', 'paragraph', 'paragraf'],
  'indent-increase': ['indent', 'increase', 'margin', 'tab', 'geser-kanan'],
  'indent-decrease': ['indent', 'decrease', 'margin', 'tab', 'geser-kiri'],
  axis: ['axis', 'center', 'align', 'sumbu', 'pusat'],
  'from-axis': ['from-axis', 'expand', 'diverge', 'luar', 'keluar'],
  'to-axis': ['to-axis', 'collapse', 'converge', 'dalam', 'masuk'],
  right: ['right', 'outgoing', 'send', 'kanan', 'keluar'],
  forwarded: ['forwarded', 'forward', 'teruskan'],
  incoming: ['incoming', 'inbound', 'masuk', 'panggilan-masuk'],
  outgoing: ['outgoing', 'outbound', 'keluar', 'panggilan-keluar'],
  missed: ['missed', 'unanswered', 'tak-terjawab', 'terlewat'],
  high: ['high', 'strong', 'penuh', 'tinggi', 'kuat'],
  low: ['low', 'weak', 'rendah', 'lemah'],
  zero: ['zero', 'none', 'empty', 'kosong', 'nol'],
  ccw: ['ccw', 'counter-clockwise', 'berlawanan-arah-jarum-jam'],
  cw: ['cw', 'clockwise', 'searah-jarum-jam'],
};

let enrichedCount = 0;

for (const file of files) {
  const filePath = path.join(dataIconsDir, file);
  const raw = fs.readFileSync(filePath, 'utf-8');
  const icon = JSON.parse(raw);
  const iconName = (icon.name || file.replace(/\.json$/, '')).trim();

  const tags = new Set(Array.isArray(icon.tags) ? icon.tags : []);

  // Always include the icon name and its parts
  tags.add('iconix');
  tags.add(iconName);
  iconName.split('-').forEach((p) => tags.add(p));

  // Fix known typos
  if (iconName === 'antenna') {
    tags.delete('angle');
    tags.delete('1');
  }

  // Apply base dictionary matches
  for (const [key, words] of Object.entries(TAG_DICTIONARY)) {
    if (iconName === key || iconName.startsWith(`${key}-`)) {
      words.forEach((w) => tags.add(w));
    }
  }

  // Handle clock hour numbers (clock-1 to clock-12)
  const clockHourMatch = iconName.match(/^clock-(\d+)$/);
  if (clockHourMatch) {
    const num = clockHourMatch[1];
    const numberWords = {
      '1': ['one', '1-oclock'],
      '2': ['two', '2-oclock'],
      '3': ['three', '3-oclock'],
      '4': ['four', '4-oclock'],
      '5': ['five', '5-oclock'],
      '6': ['six', '6-oclock'],
      '7': ['seven', '7-oclock'],
      '8': ['eight', '8-oclock'],
      '9': ['nine', '9-oclock'],
      '10': ['ten', '10-oclock'],
      '11': ['eleven', '11-oclock'],
      '12': ['twelve', '12-oclock'],
    };
    if (numberWords[num]) {
      numberWords[num].forEach((w) => tags.add(w));
    }
  }

  // Handle tv-minimalis special case
  if (iconName.startsWith('tv-minimalis')) {
    TAG_DICTIONARY.tv.forEach((w) => tags.add(w));
    tags.add('minimalis');
    tags.add('minimal');
  }
  if (iconName.startsWith('laptop-minimalis')) {
    TAG_DICTIONARY.laptop.forEach((w) => tags.add(w));
    tags.add('minimalis');
    tags.add('minimal');
  }
  if (iconName.startsWith('speaker-minimalis')) {
    TAG_DICTIONARY.speaker.forEach((w) => tags.add(w));
    tags.add('minimalis');
    tags.add('minimal');
  }

  // Apply suffix dictionary matches
  for (const [suffix, words] of Object.entries(SUFFIX_DICTIONARY)) {
    if (iconName.endsWith(`-${suffix}`) || iconName === suffix) {
      words.forEach((w) => tags.add(w));
    }
  }

  // Cross-reference off and slash (e.g. disabled, nonaktif, mati, cancel)
  if (iconName.includes('slash')) {
    ['off', 'disabled', 'nonaktif', 'mati', 'inactive', 'garis-miring', 'cancel', 'strip'].forEach((w) => tags.add(w));
  }
  if (iconName.includes('off')) {
    ['slash', 'disabled', 'turn-off', 'nonaktif', 'mati', 'inactive', 'garis-miring', 'strip'].forEach((w) => tags.add(w));
  }

  // Handle grid dimensions & shapes
  if (iconName.includes('2x2')) {
    ['2x2', 'matrix', '4-cells', 'empat-kotak', 'grid'].forEach((w) => tags.add(w));
  }
  if (iconName.includes('3x2')) {
    ['3x2', 'matrix', '6-cells', 'enam-kotak', 'grid'].forEach((w) => tags.add(w));
  }
  if (iconName.includes('3x3')) {
    ['3x3', 'matrix', '9-cells', 'sembilan-kotak', 'grid'].forEach((w) => tags.add(w));
  }

  // Handle column splits
  if (iconName.startsWith('columns-2')) {
    ['2-columns', 'dua-kolom', 'split', 'half', 'kolom'].forEach((w) => tags.add(w));
  }
  if (iconName.startsWith('columns-3')) {
    ['3-columns', 'tiga-kolom', 'three-columns', 'kolom'].forEach((w) => tags.add(w));
  }
  if (iconName.startsWith('columns-4')) {
    ['4-columns', 'empat-kolom', 'four-columns', 'kolom'].forEach((w) => tags.add(w));
  }

  // Handle notification-flag
  if (iconName === 'notification-flag') {
    ['notification', 'flag', 'alert', 'bookmark', 'notice', 'mark', 'bendera', 'notifikasi', 'pemberitahuan'].forEach((w) => tags.add(w));
  }

  // Cross-reference plus <-> add
  if (iconName.includes('plus')) {
    ['add', 'create', 'new', 'tambah', 'baru', 'buat'].forEach((w) => tags.add(w));
  }
  if (iconName.includes('add')) {
    ['plus', 'create', 'new', 'tambah', 'baru', 'buat'].forEach((w) => tags.add(w));
  }

  // Cross-reference minus <-> remove
  if (iconName.includes('minus')) {
    ['remove', 'delete', 'exclude', 'kurang', 'hapus'].forEach((w) => tags.add(w));
  }
  if (iconName.includes('remove')) {
    ['minus', 'delete', 'exclude', 'kurang', 'hapus'].forEach((w) => tags.add(w));
  }

  // Cross-reference x <-> cancel / close / dismiss / delete
  if (iconName.endsWith('-x') || iconName.includes('-x-') || iconName === 'x') {
    ['cancel', 'close', 'dismiss', 'reject', 'remove', 'delete', 'clear', 'silang', 'batal', 'tutup', 'hapus'].forEach((w) => tags.add(w));
  }

  // Cross-reference check <-> tick / done / success / verified
  if (iconName.includes('check')) {
    ['tick', 'done', 'success', 'verified', 'approved', 'ok', 'completed', 'confirm', 'centang', 'selesai', 'benar', 'sukses', 'setuju'].forEach((w) => tags.add(w));
  }

  // Cross-reference screen-share
  if (iconName.includes('screen-share')) {
    ['screen-share', 'share', 'cast', 'stream', 'broadcast', 'airplay', 'bagikan-layar'].forEach((w) => tags.add(w));
  }

  // Cross-reference cog <-> gear / settings
  if (iconName.includes('cog') || iconName.includes('gear')) {
    ['cog', 'gear', 'settings', 'configuration', 'preferences', 'options', 'setup', 'pengaturan', 'setelan'].forEach((w) => tags.add(w));
  }

  // Convert set back to array and clean up empty / numeric junk
  const cleanTags = Array.from(tags)
    .map((t) => t.trim().toLowerCase())
    .filter((t) => t.length > 0 && isNaN(Number(t)));

  // Check if tags changed
  const oldTagString = (icon.tags || []).join(',');
  const newTagString = cleanTags.join(',');

  if (oldTagString !== newTagString) {
    icon.tags = cleanTags;
    fs.writeFileSync(filePath, JSON.stringify(icon, null, 2) + '\n', 'utf-8');
    enrichedCount++;
  }
}

console.log(`✅ Successfully enriched tags for ${enrichedCount} icons in data/icons/!`);
