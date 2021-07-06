// @flow

import type { AbstractComponent } from 'react';
import loadable from '@loadable/component';

export type IconNames =
  | 'airplay'
  | 'alarm_clock'
  | 'align_horizontal'
  | 'align_vertical'
  | 'angle'
  | 'archive'
  | 'arrow_bottom_left'
  | 'arrow_bottom_right'
  | 'arrow_down'
  | 'arrow_down_circle'
  | 'arrow_left'
  | 'arrow_left_circle'
  | 'arrow_right'
  | 'arrow_right_circle'
  | 'arrow_top_left'
  | 'arrow_top_right'
  | 'arrow_up'
  | 'arrow_up_circle'
  | 'audio_wave'
  | 'backspace'
  | 'backward'
  | 'bag'
  | 'battery_75'
  | 'battery_charging'
  | 'battery_empty'
  | 'battery_full'
  | 'battery_half'
  | 'battery_low'
  | 'bell'
  | 'bell_disabled'
  | 'bell_ringing'
  | 'bell_snooze'
  | 'bluetooth'
  | 'book'
  | 'book_closed'
  | 'book_text'
  | 'bookmark'
  | 'bookmark_book'
  | 'box'
  | 'box_download'
  | 'box_open'
  | 'branch'
  | 'briefcase'
  | 'browser'
  | 'browser_alt'
  | 'button_add'
  | 'button_minus'
  | 'calculator'
  | 'calendar'
  | 'calendar_add'
  | 'calendar_date'
  | 'calendar_day'
  | 'calendar_days'
  | 'calendar_last_day'
  | 'calendar_month'
  | 'calendar_move'
  | 'calendar_remove'
  | 'calendar_split'
  | 'calendar_week'
  | 'camera'
  | 'camera_alt'
  | 'camera_noflash'
  | 'camera_noflash_alt'
  | 'capture'
  | 'card_timeline'
  | 'card_view'
  | 'carousel'
  | 'cart'
  | 'cast'
  | 'chain'
  | 'chat_add'
  | 'check'
  | 'check_circle'
  | 'check_circle_outside'
  | 'checkbox_checked'
  | 'checkbox_empty'
  | 'chevron_close'
  | 'chevron_down'
  | 'chevron_down_circle'
  | 'chevron_down_double'
  | 'chevron_left'
  | 'chevron_left_circle'
  | 'chevron_left_double'
  | 'chevron_open'
  | 'chevron_right'
  | 'chevron_right_circle'
  | 'chevron_right_double'
  | 'chevron_up'
  | 'chevron_up_circle'
  | 'chevron_up_double'
  | 'circle'
  | 'circle_menu'
  | 'circle_split'
  | 'clipboard'
  | 'clipboard_add'
  | 'clipboard_check'
  | 'clipboard_copy'
  | 'clipboard_cross'
  | 'clipboard_notes'
  | 'clipboard_remove'
  | 'clock'
  | 'close'
  | 'cloud'
  | 'cloud_disconnect'
  | 'cloud_download'
  | 'cloud_download_alt'
  | 'cloud_upload'
  | 'cloud_upload_alt'
  | 'code'
  | 'coffee'
  | 'coin'
  | 'coins'
  | 'compass'
  | 'component_add'
  | 'contacts'
  | 'contract'
  | 'create'
  | 'credit_card'
  | 'crop'
  | 'cross'
  | 'cross_circle'
  | 'crosshair'
  | 'cube'
  | 'cylinder'
  | 'database'
  | 'diamond'
  | 'directions'
  | 'disc'
  | 'display'
  | 'display_alt'
  | 'document'
  | 'document_justified'
  | 'document_list'
  | 'document_stack'
  | 'document_words'
  | 'door'
  | 'door_alt'
  | 'download'
  | 'download_alt'
  | 'downward'
  | 'drag'
  | 'drag_circle'
  | 'drag_vertical'
  | 'duplicate'
  | 'duplicate_alt'
  | 'enter'
  | 'enter_alt'
  | 'episodes'
  | 'exit_left'
  | 'exit_right'
  | 'expand'
  | 'expand_height'
  | 'expand_width'
  | 'external'
  | 'eye'
  | 'eye_closed'
  | 'eye_no'
  | 'face_delighted'
  | 'face_happy'
  | 'face_neutral'
  | 'face_sad'
  | 'file_download'
  | 'file_upload'
  | 'files_history'
  | 'files_multi'
  | 'files_stack'
  | 'film'
  | 'filter'
  | 'filter_circle'
  | 'filter_single'
  | 'filtering'
  | 'fingerprint'
  | 'flag'
  | 'flame'
  | 'flame_alt'
  | 'flip_view'
  | 'floppy'
  | 'folder_add'
  | 'folder_closed'
  | 'folder_minus'
  | 'folder_open'
  | 'fork_git'
  | 'forward'
  | 'frame'
  | 'fullscreen'
  | 'funnel'
  | 'gauge'
  | 'gift'
  | 'globe'
  | 'gps'
  | 'grab'
  | 'graph_bar'
  | 'graph_box'
  | 'graph_increase'
  | 'grid'
  | 'grid_circles'
  | 'grid_circles_add'
  | 'grid_small'
  | 'grid_squares'
  | 'grid_squares_add'
  | 'hand'
  | 'harddrive'
  | 'hash'
  | 'heart'
  | 'heart_rate'
  | 'heart_remove'
  | 'height'
  | 'hierarchy'
  | 'home'
  | 'home_alt'
  | 'home_check'
  | 'home_door'
  | 'import'
  | 'inbox'
  | 'inbox_alt'
  | 'info_circle'
  | 'iphone_landscape'
  | 'iphone_portrait'
  | 'jump_backward'
  | 'jump_forward'
  | 'jump_left'
  | 'jump_right'
  | 'keyboard'
  | 'laptop'
  | 'lightbulb'
  | 'lightbulb_on'
  | 'lightning'
  | 'lightning_alt'
  | 'lineweight'
  | 'link'
  | 'link_alt'
  | 'link_broken'
  | 'link_horizontal'
  | 'link_vertical'
  | 'list'
  | 'list_add'
  | 'list_numbered'
  | 'loader'
  | 'location'
  | 'lock'
  | 'lock_open'
  | 'mail'
  | 'mail_add'
  | 'mail_delete'
  | 'mail_minus'
  | 'mail_new'
  | 'mail_open'
  | 'mail_remove'
  | 'marquee'
  | 'maximise'
  | 'menu_hamburger'
  | 'menu_horizontal'
  | 'menu_vertical'
  | 'message'
  | 'message_writing'
  | 'microphone'
  | 'microphone_disabled'
  | 'microphone_muted'
  | 'midpoint'
  | 'mini_player'
  | 'minimise'
  | 'minus'
  | 'minus_circle'
  | 'moon'
  | 'move'
  | 'newspaper'
  | 'no_sign'
  | 'notebook'
  | 'notification'
  | 'nut'
  | 'pages'
  | 'panel_bottom'
  | 'panel_center'
  | 'panel_left'
  | 'panel_right'
  | 'panel_sectioned'
  | 'panel_top'
  | 'paper'
  | 'paper_folded'
  | 'paper_plane'
  | 'paper_plane_alt'
  | 'paperclip'
  | 'paragraph_center'
  | 'paragraph_end'
  | 'paragraph_left'
  | 'paragraph_right'
  | 'paragraph_start'
  | 'pen'
  | 'phone_landscape'
  | 'phone_portrait'
  | 'picture'
  | 'pie_half'
  | 'pie_quarter'
  | 'pie_third'
  | 'play_button'
  | 'plus'
  | 'plus_circle'
  | 'postcard'
  | 'printer'
  | 'projector'
  | 'pull_down'
  | 'pull_left'
  | 'pull_right'
  | 'pull_up'
  | 'push_down'
  | 'push_left'
  | 'push_right'
  | 'push_up'
  | 'question_circle'
  | 'radio_on'
  | 'receipt'
  | 'record'
  | 'redo'
  | 'refresh'
  | 'refresh_alt'
  | 'replicate'
  | 'replicate_alt'
  | 'reset'
  | 'reset_alt'
  | 'reset_forward'
  | 'reset_hard'
  | 'reset_temporary'
  | 'retweet'
  | 'reuse'
  | 'reverse'
  | 'reverse_alt'
  | 'revert'
  | 'rocket'
  | 'ruler'
  | 'scale'
  | 'scale_contract'
  | 'scale_extend'
  | 'scalpel'
  | 'search'
  | 'server'
  | 'settings'
  | 'share'
  | 'share_alt'
  | 'shuffle'
  | 'side_menu'
  | 'slash_backward'
  | 'slash_forward'
  | 'sliders'
  | 'sort'
  | 'sort_alt'
  | 'speaker'
  | 'speech_bubble'
  | 'speech_typing'
  | 'split'
  | 'split_three'
  | 'star'
  | 'sun'
  | 'support'
  | 'swap'
  | 'switch'
  | 'table'
  | 'table_header'
  | 'tag'
  | 'tag_milestone'
  | 'tags'
  | 'target'
  | 'thread'
  | 'thumbs_down'
  | 'thumbs_up'
  | 'ticket'
  | 'timeline'
  | 'todo'
  | 'toggle'
  | 'toggles'
  | 'translate'
  | 'trash'
  | 'trash_alt'
  | 'trophy'
  | 'tv_mode'
  | 'unarchive'
  | 'undo'
  | 'undo_history'
  | 'unlink_horizontal'
  | 'unlink_vertical'
  | 'upload'
  | 'upload_alt'
  | 'upward'
  | 'user'
  | 'user_add'
  | 'user_circle'
  | 'user_male'
  | 'user_male_circle'
  | 'user_remove'
  | 'users'
  | 'venn'
  | 'version'
  | 'versions'
  | 'video'
  | 'volume_0'
  | 'volume_add'
  | 'volume_disabled'
  | 'volume_high'
  | 'volume_low'
  | 'volume_minus'
  | 'volume_muted'
  | 'wallet'
  | 'warning_circle'
  | 'warning_hex'
  | 'warning_triangle'
  | 'waves'
  | 'width'
  | 'wifi'
  | 'wifi_error'
  | 'wifi_none'
  | 'window'
  | 'window_collapse_left'
  | 'window_collapse_right'
  | 'window_content'
  | 'wrap_back'
  | 'wrap_forward'
  | 'write'
  | 'zoom_cancel'
  | 'zoom_in'
  | 'zoom_out'
  | 'zoom_reset';

const loadableOptions = {
  ssr: false,
  fallback: (
    <span
      style={{
        // this creates the same empty space as any loaded icon so the UI is not glitching
        width: '1em',
        height: '1em',
        display: 'inline-block',
      }}
    />
  ),
};

export const ComponentsMap: { +[IconNames]: AbstractComponent<{}> } = {
  airplay: loadable(() => import('./Airplay'), loadableOptions),
  alarm_clock: loadable(() => import('./AlarmClock'), loadableOptions),
  align_horizontal: loadable(() => import('./AlignHorizontal'), loadableOptions),
  align_vertical: loadable(() => import('./AlignVertical'), loadableOptions),
  angle: loadable(() => import('./Angle'), loadableOptions),
  archive: loadable(() => import('./Archive'), loadableOptions),
  arrow_bottom_left: loadable(() => import('./ArrowBottomLeft'), loadableOptions),
  arrow_bottom_right: loadable(() => import('./ArrowBottomRight'), loadableOptions),
  arrow_down: loadable(() => import('./ArrowDown'), loadableOptions),
  arrow_down_circle: loadable(() => import('./ArrowDownCircle'), loadableOptions),
  arrow_left: loadable(() => import('./ArrowLeft'), loadableOptions),
  arrow_left_circle: loadable(() => import('./ArrowLeftCircle'), loadableOptions),
  arrow_right: loadable(() => import('./ArrowRight'), loadableOptions),
  arrow_right_circle: loadable(() => import('./ArrowRightCircle'), loadableOptions),
  arrow_top_left: loadable(() => import('./ArrowTopLeft'), loadableOptions),
  arrow_top_right: loadable(() => import('./ArrowTopRight'), loadableOptions),
  arrow_up: loadable(() => import('./ArrowUp'), loadableOptions),
  arrow_up_circle: loadable(() => import('./ArrowUpCircle'), loadableOptions),
  audio_wave: loadable(() => import('./AudioWave'), loadableOptions),
  backspace: loadable(() => import('./Backspace'), loadableOptions),
  backward: loadable(() => import('./Backward'), loadableOptions),
  bag: loadable(() => import('./Bag'), loadableOptions),
  battery_75: loadable(() => import('./Battery75'), loadableOptions),
  battery_charging: loadable(() => import('./BatteryCharging'), loadableOptions),
  battery_empty: loadable(() => import('./BatteryEmpty'), loadableOptions),
  battery_full: loadable(() => import('./BatteryFull'), loadableOptions),
  battery_half: loadable(() => import('./BatteryHalf'), loadableOptions),
  battery_low: loadable(() => import('./BatteryLow'), loadableOptions),
  bell: loadable(() => import('./Bell'), loadableOptions),
  bell_disabled: loadable(() => import('./BellDisabled'), loadableOptions),
  bell_ringing: loadable(() => import('./BellRinging'), loadableOptions),
  bell_snooze: loadable(() => import('./BellSnooze'), loadableOptions),
  bluetooth: loadable(() => import('./Bluetooth'), loadableOptions),
  book: loadable(() => import('./Book'), loadableOptions),
  book_closed: loadable(() => import('./BookClosed'), loadableOptions),
  book_text: loadable(() => import('./BookText'), loadableOptions),
  bookmark: loadable(() => import('./Bookmark'), loadableOptions),
  bookmark_book: loadable(() => import('./BookmarkBook'), loadableOptions),
  box: loadable(() => import('./Box'), loadableOptions),
  box_download: loadable(() => import('./BoxDownload'), loadableOptions),
  box_open: loadable(() => import('./BoxOpen'), loadableOptions),
  branch: loadable(() => import('./Branch'), loadableOptions),
  briefcase: loadable(() => import('./Briefcase'), loadableOptions),
  browser: loadable(() => import('./Browser'), loadableOptions),
  browser_alt: loadable(() => import('./BrowserAlt'), loadableOptions),
  button_add: loadable(() => import('./ButtonAdd'), loadableOptions),
  button_minus: loadable(() => import('./ButtonMinus'), loadableOptions),
  calculator: loadable(() => import('./Calculator'), loadableOptions),
  calendar: loadable(() => import('./Calendar'), loadableOptions),
  calendar_add: loadable(() => import('./CalendarAdd'), loadableOptions),
  calendar_date: loadable(() => import('./CalendarDate'), loadableOptions),
  calendar_day: loadable(() => import('./CalendarDay'), loadableOptions),
  calendar_days: loadable(() => import('./CalendarDays'), loadableOptions),
  calendar_last_day: loadable(() => import('./CalendarLastDay'), loadableOptions),
  calendar_month: loadable(() => import('./CalendarMonth'), loadableOptions),
  calendar_move: loadable(() => import('./CalendarMove'), loadableOptions),
  calendar_remove: loadable(() => import('./CalendarRemove'), loadableOptions),
  calendar_split: loadable(() => import('./CalendarSplit'), loadableOptions),
  calendar_week: loadable(() => import('./CalendarWeek'), loadableOptions),
  camera: loadable(() => import('./Camera'), loadableOptions),
  camera_alt: loadable(() => import('./CameraAlt'), loadableOptions),
  camera_noflash: loadable(() => import('./CameraNoflash'), loadableOptions),
  camera_noflash_alt: loadable(() => import('./CameraNoflashAlt'), loadableOptions),
  capture: loadable(() => import('./Capture'), loadableOptions),
  card_timeline: loadable(() => import('./CardTimeline'), loadableOptions),
  card_view: loadable(() => import('./CardView'), loadableOptions),
  carousel: loadable(() => import('./Carousel'), loadableOptions),
  cart: loadable(() => import('./Cart'), loadableOptions),
  cast: loadable(() => import('./Cast'), loadableOptions),
  chain: loadable(() => import('./Chain'), loadableOptions),
  chat_add: loadable(() => import('./ChatAdd'), loadableOptions),
  check: loadable(() => import('./Check'), loadableOptions),
  check_circle: loadable(() => import('./CheckCircle'), loadableOptions),
  check_circle_outside: loadable(() => import('./CheckCircleOutside'), loadableOptions),
  checkbox_checked: loadable(() => import('./CheckboxChecked'), loadableOptions),
  checkbox_empty: loadable(() => import('./CheckboxEmpty'), loadableOptions),
  chevron_close: loadable(() => import('./ChevronClose'), loadableOptions),
  chevron_down: loadable(() => import('./ChevronDown'), loadableOptions),
  chevron_down_circle: loadable(() => import('./ChevronDownCircle'), loadableOptions),
  chevron_down_double: loadable(() => import('./ChevronDownDouble'), loadableOptions),
  chevron_left: loadable(() => import('./ChevronLeft'), loadableOptions),
  chevron_left_circle: loadable(() => import('./ChevronLeftCircle'), loadableOptions),
  chevron_left_double: loadable(() => import('./ChevronLeftDouble'), loadableOptions),
  chevron_open: loadable(() => import('./ChevronOpen'), loadableOptions),
  chevron_right: loadable(() => import('./ChevronRight'), loadableOptions),
  chevron_right_circle: loadable(() => import('./ChevronRightCircle'), loadableOptions),
  chevron_right_double: loadable(() => import('./ChevronRightDouble'), loadableOptions),
  chevron_up: loadable(() => import('./ChevronUp'), loadableOptions),
  chevron_up_circle: loadable(() => import('./ChevronUpCircle'), loadableOptions),
  chevron_up_double: loadable(() => import('./ChevronUpDouble'), loadableOptions),
  circle: loadable(() => import('./Circle'), loadableOptions),
  circle_menu: loadable(() => import('./CircleMenu'), loadableOptions),
  circle_split: loadable(() => import('./CircleSplit'), loadableOptions),
  clipboard: loadable(() => import('./Clipboard'), loadableOptions),
  clipboard_add: loadable(() => import('./ClipboardAdd'), loadableOptions),
  clipboard_check: loadable(() => import('./ClipboardCheck'), loadableOptions),
  clipboard_copy: loadable(() => import('./ClipboardCopy'), loadableOptions),
  clipboard_cross: loadable(() => import('./ClipboardCross'), loadableOptions),
  clipboard_notes: loadable(() => import('./ClipboardNotes'), loadableOptions),
  clipboard_remove: loadable(() => import('./ClipboardRemove'), loadableOptions),
  clock: loadable(() => import('./Clock'), loadableOptions),
  close: loadable(() => import('./Close'), loadableOptions),
  cloud: loadable(() => import('./Cloud'), loadableOptions),
  cloud_disconnect: loadable(() => import('./CloudDisconnect'), loadableOptions),
  cloud_download: loadable(() => import('./CloudDownload'), loadableOptions),
  cloud_download_alt: loadable(() => import('./CloudDownloadAlt'), loadableOptions),
  cloud_upload: loadable(() => import('./CloudUpload'), loadableOptions),
  cloud_upload_alt: loadable(() => import('./CloudUploadAlt'), loadableOptions),
  code: loadable(() => import('./Code'), loadableOptions),
  coffee: loadable(() => import('./Coffee'), loadableOptions),
  coin: loadable(() => import('./Coin'), loadableOptions),
  coins: loadable(() => import('./Coins'), loadableOptions),
  compass: loadable(() => import('./Compass'), loadableOptions),
  component_add: loadable(() => import('./ComponentAdd'), loadableOptions),
  contacts: loadable(() => import('./Contacts'), loadableOptions),
  contract: loadable(() => import('./Contract'), loadableOptions),
  create: loadable(() => import('./Create'), loadableOptions),
  credit_card: loadable(() => import('./CreditCard'), loadableOptions),
  crop: loadable(() => import('./Crop'), loadableOptions),
  cross: loadable(() => import('./Cross'), loadableOptions),
  cross_circle: loadable(() => import('./CrossCircle'), loadableOptions),
  crosshair: loadable(() => import('./Crosshair'), loadableOptions),
  cube: loadable(() => import('./Cube'), loadableOptions),
  cylinder: loadable(() => import('./Cylinder'), loadableOptions),
  database: loadable(() => import('./Database'), loadableOptions),
  diamond: loadable(() => import('./Diamond'), loadableOptions),
  directions: loadable(() => import('./Directions'), loadableOptions),
  disc: loadable(() => import('./Disc'), loadableOptions),
  display: loadable(() => import('./Display'), loadableOptions),
  display_alt: loadable(() => import('./DisplayAlt'), loadableOptions),
  document: loadable(() => import('./Document'), loadableOptions),
  document_justified: loadable(() => import('./DocumentJustified'), loadableOptions),
  document_list: loadable(() => import('./DocumentList'), loadableOptions),
  document_stack: loadable(() => import('./DocumentStack'), loadableOptions),
  document_words: loadable(() => import('./DocumentWords'), loadableOptions),
  door: loadable(() => import('./Door'), loadableOptions),
  door_alt: loadable(() => import('./DoorAlt'), loadableOptions),
  download: loadable(() => import('./Download'), loadableOptions),
  download_alt: loadable(() => import('./DownloadAlt'), loadableOptions),
  downward: loadable(() => import('./Downward'), loadableOptions),
  drag: loadable(() => import('./Drag'), loadableOptions),
  drag_circle: loadable(() => import('./DragCircle'), loadableOptions),
  drag_vertical: loadable(() => import('./DragVertical'), loadableOptions),
  duplicate: loadable(() => import('./Duplicate'), loadableOptions),
  duplicate_alt: loadable(() => import('./DuplicateAlt'), loadableOptions),
  enter: loadable(() => import('./Enter'), loadableOptions),
  enter_alt: loadable(() => import('./EnterAlt'), loadableOptions),
  episodes: loadable(() => import('./Episodes'), loadableOptions),
  exit_left: loadable(() => import('./ExitLeft'), loadableOptions),
  exit_right: loadable(() => import('./ExitRight'), loadableOptions),
  expand: loadable(() => import('./Expand'), loadableOptions),
  expand_height: loadable(() => import('./ExpandHeight'), loadableOptions),
  expand_width: loadable(() => import('./ExpandWidth'), loadableOptions),
  external: loadable(() => import('./External'), loadableOptions),
  eye: loadable(() => import('./Eye'), loadableOptions),
  eye_closed: loadable(() => import('./EyeClosed'), loadableOptions),
  eye_no: loadable(() => import('./EyeNo'), loadableOptions),
  face_delighted: loadable(() => import('./FaceDelighted'), loadableOptions),
  face_happy: loadable(() => import('./FaceHappy'), loadableOptions),
  face_neutral: loadable(() => import('./FaceNeutral'), loadableOptions),
  face_sad: loadable(() => import('./FaceSad'), loadableOptions),
  file_download: loadable(() => import('./FileDownload'), loadableOptions),
  file_upload: loadable(() => import('./FileUpload'), loadableOptions),
  files_history: loadable(() => import('./FilesHistory'), loadableOptions),
  files_multi: loadable(() => import('./FilesMulti'), loadableOptions),
  files_stack: loadable(() => import('./FilesStack'), loadableOptions),
  film: loadable(() => import('./Film'), loadableOptions),
  filter: loadable(() => import('./Filter'), loadableOptions),
  filter_circle: loadable(() => import('./FilterCircle'), loadableOptions),
  filter_single: loadable(() => import('./FilterSingle'), loadableOptions),
  filtering: loadable(() => import('./Filtering'), loadableOptions),
  fingerprint: loadable(() => import('./Fingerprint'), loadableOptions),
  flag: loadable(() => import('./Flag'), loadableOptions),
  flame: loadable(() => import('./Flame'), loadableOptions),
  flame_alt: loadable(() => import('./FlameAlt'), loadableOptions),
  flip_view: loadable(() => import('./FlipView'), loadableOptions),
  floppy: loadable(() => import('./Floppy'), loadableOptions),
  folder_add: loadable(() => import('./FolderAdd'), loadableOptions),
  folder_closed: loadable(() => import('./FolderClosed'), loadableOptions),
  folder_minus: loadable(() => import('./FolderMinus'), loadableOptions),
  folder_open: loadable(() => import('./FolderOpen'), loadableOptions),
  fork_git: loadable(() => import('./ForkGit'), loadableOptions),
  forward: loadable(() => import('./Forward'), loadableOptions),
  frame: loadable(() => import('./Frame'), loadableOptions),
  fullscreen: loadable(() => import('./Fullscreen'), loadableOptions),
  funnel: loadable(() => import('./Funnel'), loadableOptions),
  gauge: loadable(() => import('./Gauge'), loadableOptions),
  gift: loadable(() => import('./Gift'), loadableOptions),
  globe: loadable(() => import('./Globe'), loadableOptions),
  gps: loadable(() => import('./Gps'), loadableOptions),
  grab: loadable(() => import('./Grab'), loadableOptions),
  graph_bar: loadable(() => import('./GraphBar'), loadableOptions),
  graph_box: loadable(() => import('./GraphBox'), loadableOptions),
  graph_increase: loadable(() => import('./GraphIncrease'), loadableOptions),
  grid: loadable(() => import('./Grid'), loadableOptions),
  grid_circles: loadable(() => import('./GridCircles'), loadableOptions),
  grid_circles_add: loadable(() => import('./GridCirclesAdd'), loadableOptions),
  grid_small: loadable(() => import('./GridSmall'), loadableOptions),
  grid_squares: loadable(() => import('./GridSquares'), loadableOptions),
  grid_squares_add: loadable(() => import('./GridSquaresAdd'), loadableOptions),
  hand: loadable(() => import('./Hand'), loadableOptions),
  harddrive: loadable(() => import('./Harddrive'), loadableOptions),
  hash: loadable(() => import('./Hash'), loadableOptions),
  heart: loadable(() => import('./Heart'), loadableOptions),
  heart_rate: loadable(() => import('./HeartRate'), loadableOptions),
  heart_remove: loadable(() => import('./HeartRemove'), loadableOptions),
  height: loadable(() => import('./Height'), loadableOptions),
  hierarchy: loadable(() => import('./Hierarchy'), loadableOptions),
  home: loadable(() => import('./Home'), loadableOptions),
  home_alt: loadable(() => import('./HomeAlt'), loadableOptions),
  home_check: loadable(() => import('./HomeCheck'), loadableOptions),
  home_door: loadable(() => import('./HomeDoor'), loadableOptions),
  import: loadable(() => import('./Import'), loadableOptions),
  inbox: loadable(() => import('./Inbox'), loadableOptions),
  inbox_alt: loadable(() => import('./InboxAlt'), loadableOptions),
  info_circle: loadable(() => import('./InfoCircle'), loadableOptions),
  iphone_landscape: loadable(() => import('./IphoneLandscape'), loadableOptions),
  iphone_portrait: loadable(() => import('./IphonePortrait'), loadableOptions),
  jump_backward: loadable(() => import('./JumpBackward'), loadableOptions),
  jump_forward: loadable(() => import('./JumpForward'), loadableOptions),
  jump_left: loadable(() => import('./JumpLeft'), loadableOptions),
  jump_right: loadable(() => import('./JumpRight'), loadableOptions),
  keyboard: loadable(() => import('./Keyboard'), loadableOptions),
  laptop: loadable(() => import('./Laptop'), loadableOptions),
  lightbulb: loadable(() => import('./Lightbulb'), loadableOptions),
  lightbulb_on: loadable(() => import('./LightbulbOn'), loadableOptions),
  lightning: loadable(() => import('./Lightning'), loadableOptions),
  lightning_alt: loadable(() => import('./LightningAlt'), loadableOptions),
  lineweight: loadable(() => import('./Lineweight'), loadableOptions),
  link: loadable(() => import('./Link'), loadableOptions),
  link_alt: loadable(() => import('./LinkAlt'), loadableOptions),
  link_broken: loadable(() => import('./LinkBroken'), loadableOptions),
  link_horizontal: loadable(() => import('./LinkHorizontal'), loadableOptions),
  link_vertical: loadable(() => import('./LinkVertical'), loadableOptions),
  list: loadable(() => import('./List'), loadableOptions),
  list_add: loadable(() => import('./ListAdd'), loadableOptions),
  list_numbered: loadable(() => import('./ListNumbered'), loadableOptions),
  loader: loadable(() => import('./Loader'), loadableOptions),
  location: loadable(() => import('./Location'), loadableOptions),
  lock: loadable(() => import('./Lock'), loadableOptions),
  lock_open: loadable(() => import('./LockOpen'), loadableOptions),
  mail: loadable(() => import('./Mail'), loadableOptions),
  mail_add: loadable(() => import('./MailAdd'), loadableOptions),
  mail_delete: loadable(() => import('./MailDelete'), loadableOptions),
  mail_minus: loadable(() => import('./MailMinus'), loadableOptions),
  mail_new: loadable(() => import('./MailNew'), loadableOptions),
  mail_open: loadable(() => import('./MailOpen'), loadableOptions),
  mail_remove: loadable(() => import('./MailRemove'), loadableOptions),
  marquee: loadable(() => import('./Marquee'), loadableOptions),
  maximise: loadable(() => import('./Maximise'), loadableOptions),
  menu_hamburger: loadable(() => import('./MenuHamburger'), loadableOptions),
  menu_horizontal: loadable(() => import('./MenuHorizontal'), loadableOptions),
  menu_vertical: loadable(() => import('./MenuVertical'), loadableOptions),
  message: loadable(() => import('./Message'), loadableOptions),
  message_writing: loadable(() => import('./MessageWriting'), loadableOptions),
  microphone: loadable(() => import('./Microphone'), loadableOptions),
  microphone_disabled: loadable(() => import('./MicrophoneDisabled'), loadableOptions),
  microphone_muted: loadable(() => import('./MicrophoneMuted'), loadableOptions),
  midpoint: loadable(() => import('./Midpoint'), loadableOptions),
  mini_player: loadable(() => import('./MiniPlayer'), loadableOptions),
  minimise: loadable(() => import('./Minimise'), loadableOptions),
  minus: loadable(() => import('./Minus'), loadableOptions),
  minus_circle: loadable(() => import('./MinusCircle'), loadableOptions),
  moon: loadable(() => import('./Moon'), loadableOptions),
  move: loadable(() => import('./Move'), loadableOptions),
  newspaper: loadable(() => import('./Newspaper'), loadableOptions),
  no_sign: loadable(() => import('./NoSign'), loadableOptions),
  notebook: loadable(() => import('./Notebook'), loadableOptions),
  notification: loadable(() => import('./Notification'), loadableOptions),
  nut: loadable(() => import('./Nut'), loadableOptions),
  pages: loadable(() => import('./Pages'), loadableOptions),
  panel_bottom: loadable(() => import('./PanelBottom'), loadableOptions),
  panel_center: loadable(() => import('./PanelCenter'), loadableOptions),
  panel_left: loadable(() => import('./PanelLeft'), loadableOptions),
  panel_right: loadable(() => import('./PanelRight'), loadableOptions),
  panel_sectioned: loadable(() => import('./PanelSectioned'), loadableOptions),
  panel_top: loadable(() => import('./PanelTop'), loadableOptions),
  paper: loadable(() => import('./Paper'), loadableOptions),
  paper_folded: loadable(() => import('./PaperFolded'), loadableOptions),
  paper_plane: loadable(() => import('./PaperPlane'), loadableOptions),
  paper_plane_alt: loadable(() => import('./PaperPlaneAlt'), loadableOptions),
  paperclip: loadable(() => import('./Paperclip'), loadableOptions),
  paragraph_center: loadable(() => import('./ParagraphCenter'), loadableOptions),
  paragraph_end: loadable(() => import('./ParagraphEnd'), loadableOptions),
  paragraph_left: loadable(() => import('./ParagraphLeft'), loadableOptions),
  paragraph_right: loadable(() => import('./ParagraphRight'), loadableOptions),
  paragraph_start: loadable(() => import('./ParagraphStart'), loadableOptions),
  pen: loadable(() => import('./Pen'), loadableOptions),
  phone_landscape: loadable(() => import('./PhoneLandscape'), loadableOptions),
  phone_portrait: loadable(() => import('./PhonePortrait'), loadableOptions),
  picture: loadable(() => import('./Picture'), loadableOptions),
  pie_half: loadable(() => import('./PieHalf'), loadableOptions),
  pie_quarter: loadable(() => import('./PieQuarter'), loadableOptions),
  pie_third: loadable(() => import('./PieThird'), loadableOptions),
  play_button: loadable(() => import('./PlayButton'), loadableOptions),
  plus: loadable(() => import('./Plus'), loadableOptions),
  plus_circle: loadable(() => import('./PlusCircle'), loadableOptions),
  postcard: loadable(() => import('./Postcard'), loadableOptions),
  printer: loadable(() => import('./Printer'), loadableOptions),
  projector: loadable(() => import('./Projector'), loadableOptions),
  pull_down: loadable(() => import('./PullDown'), loadableOptions),
  pull_left: loadable(() => import('./PullLeft'), loadableOptions),
  pull_right: loadable(() => import('./PullRight'), loadableOptions),
  pull_up: loadable(() => import('./PullUp'), loadableOptions),
  push_down: loadable(() => import('./PushDown'), loadableOptions),
  push_left: loadable(() => import('./PushLeft'), loadableOptions),
  push_right: loadable(() => import('./PushRight'), loadableOptions),
  push_up: loadable(() => import('./PushUp'), loadableOptions),
  question_circle: loadable(() => import('./QuestionCircle'), loadableOptions),
  radio_on: loadable(() => import('./RadioOn'), loadableOptions),
  receipt: loadable(() => import('./Receipt'), loadableOptions),
  record: loadable(() => import('./Record'), loadableOptions),
  redo: loadable(() => import('./Redo'), loadableOptions),
  refresh: loadable(() => import('./Refresh'), loadableOptions),
  refresh_alt: loadable(() => import('./RefreshAlt'), loadableOptions),
  replicate: loadable(() => import('./Replicate'), loadableOptions),
  replicate_alt: loadable(() => import('./ReplicateAlt'), loadableOptions),
  reset: loadable(() => import('./Reset'), loadableOptions),
  reset_alt: loadable(() => import('./ResetAlt'), loadableOptions),
  reset_forward: loadable(() => import('./ResetForward'), loadableOptions),
  reset_hard: loadable(() => import('./ResetHard'), loadableOptions),
  reset_temporary: loadable(() => import('./ResetTemporary'), loadableOptions),
  retweet: loadable(() => import('./Retweet'), loadableOptions),
  reuse: loadable(() => import('./Reuse'), loadableOptions),
  reverse: loadable(() => import('./Reverse'), loadableOptions),
  reverse_alt: loadable(() => import('./ReverseAlt'), loadableOptions),
  revert: loadable(() => import('./Revert'), loadableOptions),
  rocket: loadable(() => import('./Rocket'), loadableOptions),
  ruler: loadable(() => import('./Ruler'), loadableOptions),
  scale: loadable(() => import('./Scale'), loadableOptions),
  scale_contract: loadable(() => import('./ScaleContract'), loadableOptions),
  scale_extend: loadable(() => import('./ScaleExtend'), loadableOptions),
  scalpel: loadable(() => import('./Scalpel'), loadableOptions),
  search: loadable(() => import('./Search'), loadableOptions),
  server: loadable(() => import('./Server'), loadableOptions),
  settings: loadable(() => import('./Settings'), loadableOptions),
  share: loadable(() => import('./Share'), loadableOptions),
  share_alt: loadable(() => import('./ShareAlt'), loadableOptions),
  shuffle: loadable(() => import('./Shuffle'), loadableOptions),
  side_menu: loadable(() => import('./SideMenu'), loadableOptions),
  slash_backward: loadable(() => import('./SlashBackward'), loadableOptions),
  slash_forward: loadable(() => import('./SlashForward'), loadableOptions),
  sliders: loadable(() => import('./Sliders'), loadableOptions),
  sort: loadable(() => import('./Sort'), loadableOptions),
  sort_alt: loadable(() => import('./SortAlt'), loadableOptions),
  speaker: loadable(() => import('./Speaker'), loadableOptions),
  speech_bubble: loadable(() => import('./SpeechBubble'), loadableOptions),
  speech_typing: loadable(() => import('./SpeechTyping'), loadableOptions),
  split: loadable(() => import('./Split'), loadableOptions),
  split_three: loadable(() => import('./SplitThree'), loadableOptions),
  star: loadable(() => import('./Star'), loadableOptions),
  sun: loadable(() => import('./Sun'), loadableOptions),
  support: loadable(() => import('./Support'), loadableOptions),
  swap: loadable(() => import('./Swap'), loadableOptions),
  switch: loadable(() => import('./Switch'), loadableOptions),
  table: loadable(() => import('./Table'), loadableOptions),
  table_header: loadable(() => import('./TableHeader'), loadableOptions),
  tag: loadable(() => import('./Tag'), loadableOptions),
  tag_milestone: loadable(() => import('./TagMilestone'), loadableOptions),
  tags: loadable(() => import('./Tags'), loadableOptions),
  target: loadable(() => import('./Target'), loadableOptions),
  thread: loadable(() => import('./Thread'), loadableOptions),
  thumbs_down: loadable(() => import('./ThumbsDown'), loadableOptions),
  thumbs_up: loadable(() => import('./ThumbsUp'), loadableOptions),
  ticket: loadable(() => import('./Ticket'), loadableOptions),
  timeline: loadable(() => import('./Timeline'), loadableOptions),
  todo: loadable(() => import('./Todo'), loadableOptions),
  toggle: loadable(() => import('./Toggle'), loadableOptions),
  toggles: loadable(() => import('./Toggles'), loadableOptions),
  translate: loadable(() => import('./Translate'), loadableOptions),
  trash: loadable(() => import('./Trash'), loadableOptions),
  trash_alt: loadable(() => import('./TrashAlt'), loadableOptions),
  trophy: loadable(() => import('./Trophy'), loadableOptions),
  tv_mode: loadable(() => import('./TvMode'), loadableOptions),
  unarchive: loadable(() => import('./Unarchive'), loadableOptions),
  undo: loadable(() => import('./Undo'), loadableOptions),
  undo_history: loadable(() => import('./UndoHistory'), loadableOptions),
  unlink_horizontal: loadable(() => import('./UnlinkHorizontal'), loadableOptions),
  unlink_vertical: loadable(() => import('./UnlinkVertical'), loadableOptions),
  upload: loadable(() => import('./Upload'), loadableOptions),
  upload_alt: loadable(() => import('./UploadAlt'), loadableOptions),
  upward: loadable(() => import('./Upward'), loadableOptions),
  user: loadable(() => import('./User'), loadableOptions),
  user_add: loadable(() => import('./UserAdd'), loadableOptions),
  user_circle: loadable(() => import('./UserCircle'), loadableOptions),
  user_male: loadable(() => import('./UserMale'), loadableOptions),
  user_male_circle: loadable(() => import('./UserMaleCircle'), loadableOptions),
  user_remove: loadable(() => import('./UserRemove'), loadableOptions),
  users: loadable(() => import('./Users'), loadableOptions),
  venn: loadable(() => import('./Venn'), loadableOptions),
  version: loadable(() => import('./Version'), loadableOptions),
  versions: loadable(() => import('./Versions'), loadableOptions),
  video: loadable(() => import('./Video'), loadableOptions),
  volume_0: loadable(() => import('./Volume0'), loadableOptions),
  volume_add: loadable(() => import('./VolumeAdd'), loadableOptions),
  volume_disabled: loadable(() => import('./VolumeDisabled'), loadableOptions),
  volume_high: loadable(() => import('./VolumeHigh'), loadableOptions),
  volume_low: loadable(() => import('./VolumeLow'), loadableOptions),
  volume_minus: loadable(() => import('./VolumeMinus'), loadableOptions),
  volume_muted: loadable(() => import('./VolumeMuted'), loadableOptions),
  wallet: loadable(() => import('./Wallet'), loadableOptions),
  warning_circle: loadable(() => import('./WarningCircle'), loadableOptions),
  warning_hex: loadable(() => import('./WarningHex'), loadableOptions),
  warning_triangle: loadable(() => import('./WarningTriangle'), loadableOptions),
  waves: loadable(() => import('./Waves'), loadableOptions),
  width: loadable(() => import('./Width'), loadableOptions),
  wifi: loadable(() => import('./Wifi'), loadableOptions),
  wifi_error: loadable(() => import('./WifiError'), loadableOptions),
  wifi_none: loadable(() => import('./WifiNone'), loadableOptions),
  window: loadable(() => import('./Window'), loadableOptions),
  window_collapse_left: loadable(() => import('./WindowCollapseLeft'), loadableOptions),
  window_collapse_right: loadable(() => import('./WindowCollapseRight'), loadableOptions),
  window_content: loadable(() => import('./WindowContent'), loadableOptions),
  wrap_back: loadable(() => import('./WrapBack'), loadableOptions),
  wrap_forward: loadable(() => import('./WrapForward'), loadableOptions),
  write: loadable(() => import('./Write'), loadableOptions),
  zoom_cancel: loadable(() => import('./ZoomCancel'), loadableOptions),
  zoom_in: loadable(() => import('./ZoomIn'), loadableOptions),
  zoom_out: loadable(() => import('./ZoomOut'), loadableOptions),
  zoom_reset: loadable(() => import('./ZoomReset'), loadableOptions),
};
