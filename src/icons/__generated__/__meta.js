// @flow

import React, { type AbstractComponent } from 'react';

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
  | 'box_add'
  | 'box_download'
  | 'box_open'
  | 'box_remove'
  | 'boxes'
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
  | 'cubes'
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
  | 'pill'
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
  | 'signal_full'
  | 'signal_low'
  | 'signal_medium'
  | 'signal_none'
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
  | 'terminal'
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

type Props = {
  +'data-testid'?: string,
};

export const ComponentsMap: { +[IconNames]: AbstractComponent<Props> } = {
  airplay: React.lazy(() => import('./Airplay')),
  alarm_clock: React.lazy(() => import('./AlarmClock')),
  align_horizontal: React.lazy(() => import('./AlignHorizontal')),
  align_vertical: React.lazy(() => import('./AlignVertical')),
  angle: React.lazy(() => import('./Angle')),
  archive: React.lazy(() => import('./Archive')),
  arrow_bottom_left: React.lazy(() => import('./ArrowBottomLeft')),
  arrow_bottom_right: React.lazy(() => import('./ArrowBottomRight')),
  arrow_down: React.lazy(() => import('./ArrowDown')),
  arrow_down_circle: React.lazy(() => import('./ArrowDownCircle')),
  arrow_left: React.lazy(() => import('./ArrowLeft')),
  arrow_left_circle: React.lazy(() => import('./ArrowLeftCircle')),
  arrow_right: React.lazy(() => import('./ArrowRight')),
  arrow_right_circle: React.lazy(() => import('./ArrowRightCircle')),
  arrow_top_left: React.lazy(() => import('./ArrowTopLeft')),
  arrow_top_right: React.lazy(() => import('./ArrowTopRight')),
  arrow_up: React.lazy(() => import('./ArrowUp')),
  arrow_up_circle: React.lazy(() => import('./ArrowUpCircle')),
  audio_wave: React.lazy(() => import('./AudioWave')),
  backspace: React.lazy(() => import('./Backspace')),
  backward: React.lazy(() => import('./Backward')),
  bag: React.lazy(() => import('./Bag')),
  battery_75: React.lazy(() => import('./Battery75')),
  battery_charging: React.lazy(() => import('./BatteryCharging')),
  battery_empty: React.lazy(() => import('./BatteryEmpty')),
  battery_full: React.lazy(() => import('./BatteryFull')),
  battery_half: React.lazy(() => import('./BatteryHalf')),
  battery_low: React.lazy(() => import('./BatteryLow')),
  bell: React.lazy(() => import('./Bell')),
  bell_disabled: React.lazy(() => import('./BellDisabled')),
  bell_ringing: React.lazy(() => import('./BellRinging')),
  bell_snooze: React.lazy(() => import('./BellSnooze')),
  bluetooth: React.lazy(() => import('./Bluetooth')),
  book: React.lazy(() => import('./Book')),
  book_closed: React.lazy(() => import('./BookClosed')),
  book_text: React.lazy(() => import('./BookText')),
  bookmark: React.lazy(() => import('./Bookmark')),
  bookmark_book: React.lazy(() => import('./BookmarkBook')),
  box: React.lazy(() => import('./Box')),
  box_add: React.lazy(() => import('./BoxAdd')),
  box_download: React.lazy(() => import('./BoxDownload')),
  box_open: React.lazy(() => import('./BoxOpen')),
  box_remove: React.lazy(() => import('./BoxRemove')),
  boxes: React.lazy(() => import('./Boxes')),
  branch: React.lazy(() => import('./Branch')),
  briefcase: React.lazy(() => import('./Briefcase')),
  browser: React.lazy(() => import('./Browser')),
  browser_alt: React.lazy(() => import('./BrowserAlt')),
  button_add: React.lazy(() => import('./ButtonAdd')),
  button_minus: React.lazy(() => import('./ButtonMinus')),
  calculator: React.lazy(() => import('./Calculator')),
  calendar: React.lazy(() => import('./Calendar')),
  calendar_add: React.lazy(() => import('./CalendarAdd')),
  calendar_date: React.lazy(() => import('./CalendarDate')),
  calendar_day: React.lazy(() => import('./CalendarDay')),
  calendar_days: React.lazy(() => import('./CalendarDays')),
  calendar_last_day: React.lazy(() => import('./CalendarLastDay')),
  calendar_month: React.lazy(() => import('./CalendarMonth')),
  calendar_move: React.lazy(() => import('./CalendarMove')),
  calendar_remove: React.lazy(() => import('./CalendarRemove')),
  calendar_split: React.lazy(() => import('./CalendarSplit')),
  calendar_week: React.lazy(() => import('./CalendarWeek')),
  camera: React.lazy(() => import('./Camera')),
  camera_alt: React.lazy(() => import('./CameraAlt')),
  camera_noflash: React.lazy(() => import('./CameraNoflash')),
  camera_noflash_alt: React.lazy(() => import('./CameraNoflashAlt')),
  capture: React.lazy(() => import('./Capture')),
  card_timeline: React.lazy(() => import('./CardTimeline')),
  card_view: React.lazy(() => import('./CardView')),
  carousel: React.lazy(() => import('./Carousel')),
  cart: React.lazy(() => import('./Cart')),
  cast: React.lazy(() => import('./Cast')),
  chain: React.lazy(() => import('./Chain')),
  chat_add: React.lazy(() => import('./ChatAdd')),
  check: React.lazy(() => import('./Check')),
  check_circle: React.lazy(() => import('./CheckCircle')),
  check_circle_outside: React.lazy(() => import('./CheckCircleOutside')),
  checkbox_checked: React.lazy(() => import('./CheckboxChecked')),
  checkbox_empty: React.lazy(() => import('./CheckboxEmpty')),
  chevron_close: React.lazy(() => import('./ChevronClose')),
  chevron_down: React.lazy(() => import('./ChevronDown')),
  chevron_down_circle: React.lazy(() => import('./ChevronDownCircle')),
  chevron_down_double: React.lazy(() => import('./ChevronDownDouble')),
  chevron_left: React.lazy(() => import('./ChevronLeft')),
  chevron_left_circle: React.lazy(() => import('./ChevronLeftCircle')),
  chevron_left_double: React.lazy(() => import('./ChevronLeftDouble')),
  chevron_open: React.lazy(() => import('./ChevronOpen')),
  chevron_right: React.lazy(() => import('./ChevronRight')),
  chevron_right_circle: React.lazy(() => import('./ChevronRightCircle')),
  chevron_right_double: React.lazy(() => import('./ChevronRightDouble')),
  chevron_up: React.lazy(() => import('./ChevronUp')),
  chevron_up_circle: React.lazy(() => import('./ChevronUpCircle')),
  chevron_up_double: React.lazy(() => import('./ChevronUpDouble')),
  circle: React.lazy(() => import('./Circle')),
  circle_menu: React.lazy(() => import('./CircleMenu')),
  circle_split: React.lazy(() => import('./CircleSplit')),
  clipboard: React.lazy(() => import('./Clipboard')),
  clipboard_add: React.lazy(() => import('./ClipboardAdd')),
  clipboard_check: React.lazy(() => import('./ClipboardCheck')),
  clipboard_copy: React.lazy(() => import('./ClipboardCopy')),
  clipboard_cross: React.lazy(() => import('./ClipboardCross')),
  clipboard_notes: React.lazy(() => import('./ClipboardNotes')),
  clipboard_remove: React.lazy(() => import('./ClipboardRemove')),
  clock: React.lazy(() => import('./Clock')),
  close: React.lazy(() => import('./Close')),
  cloud: React.lazy(() => import('./Cloud')),
  cloud_disconnect: React.lazy(() => import('./CloudDisconnect')),
  cloud_download: React.lazy(() => import('./CloudDownload')),
  cloud_download_alt: React.lazy(() => import('./CloudDownloadAlt')),
  cloud_upload: React.lazy(() => import('./CloudUpload')),
  cloud_upload_alt: React.lazy(() => import('./CloudUploadAlt')),
  code: React.lazy(() => import('./Code')),
  coffee: React.lazy(() => import('./Coffee')),
  coin: React.lazy(() => import('./Coin')),
  coins: React.lazy(() => import('./Coins')),
  compass: React.lazy(() => import('./Compass')),
  component_add: React.lazy(() => import('./ComponentAdd')),
  contacts: React.lazy(() => import('./Contacts')),
  contract: React.lazy(() => import('./Contract')),
  create: React.lazy(() => import('./Create')),
  credit_card: React.lazy(() => import('./CreditCard')),
  crop: React.lazy(() => import('./Crop')),
  cross: React.lazy(() => import('./Cross')),
  cross_circle: React.lazy(() => import('./CrossCircle')),
  crosshair: React.lazy(() => import('./Crosshair')),
  cube: React.lazy(() => import('./Cube')),
  cubes: React.lazy(() => import('./Cubes')),
  cylinder: React.lazy(() => import('./Cylinder')),
  database: React.lazy(() => import('./Database')),
  diamond: React.lazy(() => import('./Diamond')),
  directions: React.lazy(() => import('./Directions')),
  disc: React.lazy(() => import('./Disc')),
  display: React.lazy(() => import('./Display')),
  display_alt: React.lazy(() => import('./DisplayAlt')),
  document: React.lazy(() => import('./Document')),
  document_justified: React.lazy(() => import('./DocumentJustified')),
  document_list: React.lazy(() => import('./DocumentList')),
  document_stack: React.lazy(() => import('./DocumentStack')),
  document_words: React.lazy(() => import('./DocumentWords')),
  door: React.lazy(() => import('./Door')),
  door_alt: React.lazy(() => import('./DoorAlt')),
  download: React.lazy(() => import('./Download')),
  download_alt: React.lazy(() => import('./DownloadAlt')),
  downward: React.lazy(() => import('./Downward')),
  drag: React.lazy(() => import('./Drag')),
  drag_circle: React.lazy(() => import('./DragCircle')),
  drag_vertical: React.lazy(() => import('./DragVertical')),
  duplicate: React.lazy(() => import('./Duplicate')),
  duplicate_alt: React.lazy(() => import('./DuplicateAlt')),
  enter: React.lazy(() => import('./Enter')),
  enter_alt: React.lazy(() => import('./EnterAlt')),
  episodes: React.lazy(() => import('./Episodes')),
  exit_left: React.lazy(() => import('./ExitLeft')),
  exit_right: React.lazy(() => import('./ExitRight')),
  expand: React.lazy(() => import('./Expand')),
  expand_height: React.lazy(() => import('./ExpandHeight')),
  expand_width: React.lazy(() => import('./ExpandWidth')),
  external: React.lazy(() => import('./External')),
  eye: React.lazy(() => import('./Eye')),
  eye_closed: React.lazy(() => import('./EyeClosed')),
  eye_no: React.lazy(() => import('./EyeNo')),
  face_delighted: React.lazy(() => import('./FaceDelighted')),
  face_happy: React.lazy(() => import('./FaceHappy')),
  face_neutral: React.lazy(() => import('./FaceNeutral')),
  face_sad: React.lazy(() => import('./FaceSad')),
  file_download: React.lazy(() => import('./FileDownload')),
  file_upload: React.lazy(() => import('./FileUpload')),
  files_history: React.lazy(() => import('./FilesHistory')),
  files_multi: React.lazy(() => import('./FilesMulti')),
  files_stack: React.lazy(() => import('./FilesStack')),
  film: React.lazy(() => import('./Film')),
  filter: React.lazy(() => import('./Filter')),
  filter_circle: React.lazy(() => import('./FilterCircle')),
  filter_single: React.lazy(() => import('./FilterSingle')),
  filtering: React.lazy(() => import('./Filtering')),
  fingerprint: React.lazy(() => import('./Fingerprint')),
  flag: React.lazy(() => import('./Flag')),
  flame: React.lazy(() => import('./Flame')),
  flame_alt: React.lazy(() => import('./FlameAlt')),
  flip_view: React.lazy(() => import('./FlipView')),
  floppy: React.lazy(() => import('./Floppy')),
  folder_add: React.lazy(() => import('./FolderAdd')),
  folder_closed: React.lazy(() => import('./FolderClosed')),
  folder_minus: React.lazy(() => import('./FolderMinus')),
  folder_open: React.lazy(() => import('./FolderOpen')),
  fork_git: React.lazy(() => import('./ForkGit')),
  forward: React.lazy(() => import('./Forward')),
  frame: React.lazy(() => import('./Frame')),
  fullscreen: React.lazy(() => import('./Fullscreen')),
  funnel: React.lazy(() => import('./Funnel')),
  gauge: React.lazy(() => import('./Gauge')),
  gift: React.lazy(() => import('./Gift')),
  globe: React.lazy(() => import('./Globe')),
  gps: React.lazy(() => import('./Gps')),
  grab: React.lazy(() => import('./Grab')),
  graph_bar: React.lazy(() => import('./GraphBar')),
  graph_box: React.lazy(() => import('./GraphBox')),
  graph_increase: React.lazy(() => import('./GraphIncrease')),
  grid: React.lazy(() => import('./Grid')),
  grid_circles: React.lazy(() => import('./GridCircles')),
  grid_circles_add: React.lazy(() => import('./GridCirclesAdd')),
  grid_small: React.lazy(() => import('./GridSmall')),
  grid_squares: React.lazy(() => import('./GridSquares')),
  grid_squares_add: React.lazy(() => import('./GridSquaresAdd')),
  hand: React.lazy(() => import('./Hand')),
  harddrive: React.lazy(() => import('./Harddrive')),
  hash: React.lazy(() => import('./Hash')),
  heart: React.lazy(() => import('./Heart')),
  heart_rate: React.lazy(() => import('./HeartRate')),
  heart_remove: React.lazy(() => import('./HeartRemove')),
  height: React.lazy(() => import('./Height')),
  hierarchy: React.lazy(() => import('./Hierarchy')),
  home: React.lazy(() => import('./Home')),
  home_alt: React.lazy(() => import('./HomeAlt')),
  home_check: React.lazy(() => import('./HomeCheck')),
  home_door: React.lazy(() => import('./HomeDoor')),
  import: React.lazy(() => import('./Import')),
  inbox: React.lazy(() => import('./Inbox')),
  inbox_alt: React.lazy(() => import('./InboxAlt')),
  info_circle: React.lazy(() => import('./InfoCircle')),
  iphone_landscape: React.lazy(() => import('./IphoneLandscape')),
  iphone_portrait: React.lazy(() => import('./IphonePortrait')),
  jump_backward: React.lazy(() => import('./JumpBackward')),
  jump_forward: React.lazy(() => import('./JumpForward')),
  jump_left: React.lazy(() => import('./JumpLeft')),
  jump_right: React.lazy(() => import('./JumpRight')),
  keyboard: React.lazy(() => import('./Keyboard')),
  laptop: React.lazy(() => import('./Laptop')),
  lightbulb: React.lazy(() => import('./Lightbulb')),
  lightbulb_on: React.lazy(() => import('./LightbulbOn')),
  lightning: React.lazy(() => import('./Lightning')),
  lightning_alt: React.lazy(() => import('./LightningAlt')),
  lineweight: React.lazy(() => import('./Lineweight')),
  link: React.lazy(() => import('./Link')),
  link_alt: React.lazy(() => import('./LinkAlt')),
  link_broken: React.lazy(() => import('./LinkBroken')),
  link_horizontal: React.lazy(() => import('./LinkHorizontal')),
  link_vertical: React.lazy(() => import('./LinkVertical')),
  list: React.lazy(() => import('./List')),
  list_add: React.lazy(() => import('./ListAdd')),
  list_numbered: React.lazy(() => import('./ListNumbered')),
  loader: React.lazy(() => import('./Loader')),
  location: React.lazy(() => import('./Location')),
  lock: React.lazy(() => import('./Lock')),
  lock_open: React.lazy(() => import('./LockOpen')),
  mail: React.lazy(() => import('./Mail')),
  mail_add: React.lazy(() => import('./MailAdd')),
  mail_delete: React.lazy(() => import('./MailDelete')),
  mail_minus: React.lazy(() => import('./MailMinus')),
  mail_new: React.lazy(() => import('./MailNew')),
  mail_open: React.lazy(() => import('./MailOpen')),
  mail_remove: React.lazy(() => import('./MailRemove')),
  marquee: React.lazy(() => import('./Marquee')),
  maximise: React.lazy(() => import('./Maximise')),
  menu_hamburger: React.lazy(() => import('./MenuHamburger')),
  menu_horizontal: React.lazy(() => import('./MenuHorizontal')),
  menu_vertical: React.lazy(() => import('./MenuVertical')),
  message: React.lazy(() => import('./Message')),
  message_writing: React.lazy(() => import('./MessageWriting')),
  microphone: React.lazy(() => import('./Microphone')),
  microphone_disabled: React.lazy(() => import('./MicrophoneDisabled')),
  microphone_muted: React.lazy(() => import('./MicrophoneMuted')),
  midpoint: React.lazy(() => import('./Midpoint')),
  mini_player: React.lazy(() => import('./MiniPlayer')),
  minimise: React.lazy(() => import('./Minimise')),
  minus: React.lazy(() => import('./Minus')),
  minus_circle: React.lazy(() => import('./MinusCircle')),
  moon: React.lazy(() => import('./Moon')),
  move: React.lazy(() => import('./Move')),
  newspaper: React.lazy(() => import('./Newspaper')),
  no_sign: React.lazy(() => import('./NoSign')),
  notebook: React.lazy(() => import('./Notebook')),
  notification: React.lazy(() => import('./Notification')),
  nut: React.lazy(() => import('./Nut')),
  pages: React.lazy(() => import('./Pages')),
  panel_bottom: React.lazy(() => import('./PanelBottom')),
  panel_center: React.lazy(() => import('./PanelCenter')),
  panel_left: React.lazy(() => import('./PanelLeft')),
  panel_right: React.lazy(() => import('./PanelRight')),
  panel_sectioned: React.lazy(() => import('./PanelSectioned')),
  panel_top: React.lazy(() => import('./PanelTop')),
  paper: React.lazy(() => import('./Paper')),
  paper_folded: React.lazy(() => import('./PaperFolded')),
  paper_plane: React.lazy(() => import('./PaperPlane')),
  paper_plane_alt: React.lazy(() => import('./PaperPlaneAlt')),
  paperclip: React.lazy(() => import('./Paperclip')),
  paragraph_center: React.lazy(() => import('./ParagraphCenter')),
  paragraph_end: React.lazy(() => import('./ParagraphEnd')),
  paragraph_left: React.lazy(() => import('./ParagraphLeft')),
  paragraph_right: React.lazy(() => import('./ParagraphRight')),
  paragraph_start: React.lazy(() => import('./ParagraphStart')),
  pen: React.lazy(() => import('./Pen')),
  phone_landscape: React.lazy(() => import('./PhoneLandscape')),
  phone_portrait: React.lazy(() => import('./PhonePortrait')),
  picture: React.lazy(() => import('./Picture')),
  pie_half: React.lazy(() => import('./PieHalf')),
  pie_quarter: React.lazy(() => import('./PieQuarter')),
  pie_third: React.lazy(() => import('./PieThird')),
  pill: React.lazy(() => import('./Pill')),
  play_button: React.lazy(() => import('./PlayButton')),
  plus: React.lazy(() => import('./Plus')),
  plus_circle: React.lazy(() => import('./PlusCircle')),
  postcard: React.lazy(() => import('./Postcard')),
  printer: React.lazy(() => import('./Printer')),
  projector: React.lazy(() => import('./Projector')),
  pull_down: React.lazy(() => import('./PullDown')),
  pull_left: React.lazy(() => import('./PullLeft')),
  pull_right: React.lazy(() => import('./PullRight')),
  pull_up: React.lazy(() => import('./PullUp')),
  push_down: React.lazy(() => import('./PushDown')),
  push_left: React.lazy(() => import('./PushLeft')),
  push_right: React.lazy(() => import('./PushRight')),
  push_up: React.lazy(() => import('./PushUp')),
  question_circle: React.lazy(() => import('./QuestionCircle')),
  radio_on: React.lazy(() => import('./RadioOn')),
  receipt: React.lazy(() => import('./Receipt')),
  record: React.lazy(() => import('./Record')),
  redo: React.lazy(() => import('./Redo')),
  refresh: React.lazy(() => import('./Refresh')),
  refresh_alt: React.lazy(() => import('./RefreshAlt')),
  replicate: React.lazy(() => import('./Replicate')),
  replicate_alt: React.lazy(() => import('./ReplicateAlt')),
  reset: React.lazy(() => import('./Reset')),
  reset_alt: React.lazy(() => import('./ResetAlt')),
  reset_forward: React.lazy(() => import('./ResetForward')),
  reset_hard: React.lazy(() => import('./ResetHard')),
  reset_temporary: React.lazy(() => import('./ResetTemporary')),
  retweet: React.lazy(() => import('./Retweet')),
  reuse: React.lazy(() => import('./Reuse')),
  reverse: React.lazy(() => import('./Reverse')),
  reverse_alt: React.lazy(() => import('./ReverseAlt')),
  revert: React.lazy(() => import('./Revert')),
  rocket: React.lazy(() => import('./Rocket')),
  ruler: React.lazy(() => import('./Ruler')),
  scale: React.lazy(() => import('./Scale')),
  scale_contract: React.lazy(() => import('./ScaleContract')),
  scale_extend: React.lazy(() => import('./ScaleExtend')),
  scalpel: React.lazy(() => import('./Scalpel')),
  search: React.lazy(() => import('./Search')),
  server: React.lazy(() => import('./Server')),
  settings: React.lazy(() => import('./Settings')),
  share: React.lazy(() => import('./Share')),
  share_alt: React.lazy(() => import('./ShareAlt')),
  shuffle: React.lazy(() => import('./Shuffle')),
  side_menu: React.lazy(() => import('./SideMenu')),
  signal_full: React.lazy(() => import('./SignalFull')),
  signal_low: React.lazy(() => import('./SignalLow')),
  signal_medium: React.lazy(() => import('./SignalMedium')),
  signal_none: React.lazy(() => import('./SignalNone')),
  slash_backward: React.lazy(() => import('./SlashBackward')),
  slash_forward: React.lazy(() => import('./SlashForward')),
  sliders: React.lazy(() => import('./Sliders')),
  sort: React.lazy(() => import('./Sort')),
  sort_alt: React.lazy(() => import('./SortAlt')),
  speaker: React.lazy(() => import('./Speaker')),
  speech_bubble: React.lazy(() => import('./SpeechBubble')),
  speech_typing: React.lazy(() => import('./SpeechTyping')),
  split: React.lazy(() => import('./Split')),
  split_three: React.lazy(() => import('./SplitThree')),
  star: React.lazy(() => import('./Star')),
  sun: React.lazy(() => import('./Sun')),
  support: React.lazy(() => import('./Support')),
  swap: React.lazy(() => import('./Swap')),
  switch: React.lazy(() => import('./Switch')),
  table: React.lazy(() => import('./Table')),
  table_header: React.lazy(() => import('./TableHeader')),
  tag: React.lazy(() => import('./Tag')),
  tag_milestone: React.lazy(() => import('./TagMilestone')),
  tags: React.lazy(() => import('./Tags')),
  target: React.lazy(() => import('./Target')),
  terminal: React.lazy(() => import('./Terminal')),
  thread: React.lazy(() => import('./Thread')),
  thumbs_down: React.lazy(() => import('./ThumbsDown')),
  thumbs_up: React.lazy(() => import('./ThumbsUp')),
  ticket: React.lazy(() => import('./Ticket')),
  timeline: React.lazy(() => import('./Timeline')),
  todo: React.lazy(() => import('./Todo')),
  toggle: React.lazy(() => import('./Toggle')),
  toggles: React.lazy(() => import('./Toggles')),
  translate: React.lazy(() => import('./Translate')),
  trash: React.lazy(() => import('./Trash')),
  trash_alt: React.lazy(() => import('./TrashAlt')),
  trophy: React.lazy(() => import('./Trophy')),
  tv_mode: React.lazy(() => import('./TvMode')),
  unarchive: React.lazy(() => import('./Unarchive')),
  undo: React.lazy(() => import('./Undo')),
  undo_history: React.lazy(() => import('./UndoHistory')),
  unlink_horizontal: React.lazy(() => import('./UnlinkHorizontal')),
  unlink_vertical: React.lazy(() => import('./UnlinkVertical')),
  upload: React.lazy(() => import('./Upload')),
  upload_alt: React.lazy(() => import('./UploadAlt')),
  upward: React.lazy(() => import('./Upward')),
  user: React.lazy(() => import('./User')),
  user_add: React.lazy(() => import('./UserAdd')),
  user_circle: React.lazy(() => import('./UserCircle')),
  user_male: React.lazy(() => import('./UserMale')),
  user_male_circle: React.lazy(() => import('./UserMaleCircle')),
  user_remove: React.lazy(() => import('./UserRemove')),
  users: React.lazy(() => import('./Users')),
  venn: React.lazy(() => import('./Venn')),
  version: React.lazy(() => import('./Version')),
  versions: React.lazy(() => import('./Versions')),
  video: React.lazy(() => import('./Video')),
  volume_0: React.lazy(() => import('./Volume0')),
  volume_add: React.lazy(() => import('./VolumeAdd')),
  volume_disabled: React.lazy(() => import('./VolumeDisabled')),
  volume_high: React.lazy(() => import('./VolumeHigh')),
  volume_low: React.lazy(() => import('./VolumeLow')),
  volume_minus: React.lazy(() => import('./VolumeMinus')),
  volume_muted: React.lazy(() => import('./VolumeMuted')),
  wallet: React.lazy(() => import('./Wallet')),
  warning_circle: React.lazy(() => import('./WarningCircle')),
  warning_hex: React.lazy(() => import('./WarningHex')),
  warning_triangle: React.lazy(() => import('./WarningTriangle')),
  waves: React.lazy(() => import('./Waves')),
  width: React.lazy(() => import('./Width')),
  wifi: React.lazy(() => import('./Wifi')),
  wifi_error: React.lazy(() => import('./WifiError')),
  wifi_none: React.lazy(() => import('./WifiNone')),
  window: React.lazy(() => import('./Window')),
  window_collapse_left: React.lazy(() => import('./WindowCollapseLeft')),
  window_collapse_right: React.lazy(() => import('./WindowCollapseRight')),
  window_content: React.lazy(() => import('./WindowContent')),
  wrap_back: React.lazy(() => import('./WrapBack')),
  wrap_forward: React.lazy(() => import('./WrapForward')),
  write: React.lazy(() => import('./Write')),
  zoom_cancel: React.lazy(() => import('./ZoomCancel')),
  zoom_in: React.lazy(() => import('./ZoomIn')),
  zoom_out: React.lazy(() => import('./ZoomOut')),
  zoom_reset: React.lazy(() => import('./ZoomReset')),
};
