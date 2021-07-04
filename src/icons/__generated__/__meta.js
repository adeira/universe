// @flow strict

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

export const ComponentsMap = {
  airplay: (React.lazy(() => import('./Airplay')): AbstractComponent<{}>),
  alarm_clock: (React.lazy(() => import('./AlarmClock')): AbstractComponent<{}>),
  align_horizontal: (React.lazy(() => import('./AlignHorizontal')): AbstractComponent<{}>),
  align_vertical: (React.lazy(() => import('./AlignVertical')): AbstractComponent<{}>),
  angle: (React.lazy(() => import('./Angle')): AbstractComponent<{}>),
  archive: (React.lazy(() => import('./Archive')): AbstractComponent<{}>),
  arrow_bottom_left: (React.lazy(() => import('./ArrowBottomLeft')): AbstractComponent<{}>),
  arrow_bottom_right: (React.lazy(() => import('./ArrowBottomRight')): AbstractComponent<{}>),
  arrow_down: (React.lazy(() => import('./ArrowDown')): AbstractComponent<{}>),
  arrow_down_circle: (React.lazy(() => import('./ArrowDownCircle')): AbstractComponent<{}>),
  arrow_left: (React.lazy(() => import('./ArrowLeft')): AbstractComponent<{}>),
  arrow_left_circle: (React.lazy(() => import('./ArrowLeftCircle')): AbstractComponent<{}>),
  arrow_right: (React.lazy(() => import('./ArrowRight')): AbstractComponent<{}>),
  arrow_right_circle: (React.lazy(() => import('./ArrowRightCircle')): AbstractComponent<{}>),
  arrow_top_left: (React.lazy(() => import('./ArrowTopLeft')): AbstractComponent<{}>),
  arrow_top_right: (React.lazy(() => import('./ArrowTopRight')): AbstractComponent<{}>),
  arrow_up: (React.lazy(() => import('./ArrowUp')): AbstractComponent<{}>),
  arrow_up_circle: (React.lazy(() => import('./ArrowUpCircle')): AbstractComponent<{}>),
  audio_wave: (React.lazy(() => import('./AudioWave')): AbstractComponent<{}>),
  backspace: (React.lazy(() => import('./Backspace')): AbstractComponent<{}>),
  backward: (React.lazy(() => import('./Backward')): AbstractComponent<{}>),
  bag: (React.lazy(() => import('./Bag')): AbstractComponent<{}>),
  battery_75: (React.lazy(() => import('./Battery75')): AbstractComponent<{}>),
  battery_charging: (React.lazy(() => import('./BatteryCharging')): AbstractComponent<{}>),
  battery_empty: (React.lazy(() => import('./BatteryEmpty')): AbstractComponent<{}>),
  battery_full: (React.lazy(() => import('./BatteryFull')): AbstractComponent<{}>),
  battery_half: (React.lazy(() => import('./BatteryHalf')): AbstractComponent<{}>),
  battery_low: (React.lazy(() => import('./BatteryLow')): AbstractComponent<{}>),
  bell: (React.lazy(() => import('./Bell')): AbstractComponent<{}>),
  bell_disabled: (React.lazy(() => import('./BellDisabled')): AbstractComponent<{}>),
  bell_ringing: (React.lazy(() => import('./BellRinging')): AbstractComponent<{}>),
  bell_snooze: (React.lazy(() => import('./BellSnooze')): AbstractComponent<{}>),
  bluetooth: (React.lazy(() => import('./Bluetooth')): AbstractComponent<{}>),
  book: (React.lazy(() => import('./Book')): AbstractComponent<{}>),
  book_closed: (React.lazy(() => import('./BookClosed')): AbstractComponent<{}>),
  book_text: (React.lazy(() => import('./BookText')): AbstractComponent<{}>),
  bookmark: (React.lazy(() => import('./Bookmark')): AbstractComponent<{}>),
  bookmark_book: (React.lazy(() => import('./BookmarkBook')): AbstractComponent<{}>),
  box: (React.lazy(() => import('./Box')): AbstractComponent<{}>),
  box_download: (React.lazy(() => import('./BoxDownload')): AbstractComponent<{}>),
  box_open: (React.lazy(() => import('./BoxOpen')): AbstractComponent<{}>),
  branch: (React.lazy(() => import('./Branch')): AbstractComponent<{}>),
  briefcase: (React.lazy(() => import('./Briefcase')): AbstractComponent<{}>),
  browser: (React.lazy(() => import('./Browser')): AbstractComponent<{}>),
  browser_alt: (React.lazy(() => import('./BrowserAlt')): AbstractComponent<{}>),
  button_add: (React.lazy(() => import('./ButtonAdd')): AbstractComponent<{}>),
  button_minus: (React.lazy(() => import('./ButtonMinus')): AbstractComponent<{}>),
  calculator: (React.lazy(() => import('./Calculator')): AbstractComponent<{}>),
  calendar: (React.lazy(() => import('./Calendar')): AbstractComponent<{}>),
  calendar_add: (React.lazy(() => import('./CalendarAdd')): AbstractComponent<{}>),
  calendar_date: (React.lazy(() => import('./CalendarDate')): AbstractComponent<{}>),
  calendar_day: (React.lazy(() => import('./CalendarDay')): AbstractComponent<{}>),
  calendar_days: (React.lazy(() => import('./CalendarDays')): AbstractComponent<{}>),
  calendar_last_day: (React.lazy(() => import('./CalendarLastDay')): AbstractComponent<{}>),
  calendar_month: (React.lazy(() => import('./CalendarMonth')): AbstractComponent<{}>),
  calendar_move: (React.lazy(() => import('./CalendarMove')): AbstractComponent<{}>),
  calendar_remove: (React.lazy(() => import('./CalendarRemove')): AbstractComponent<{}>),
  calendar_split: (React.lazy(() => import('./CalendarSplit')): AbstractComponent<{}>),
  calendar_week: (React.lazy(() => import('./CalendarWeek')): AbstractComponent<{}>),
  camera: (React.lazy(() => import('./Camera')): AbstractComponent<{}>),
  camera_alt: (React.lazy(() => import('./CameraAlt')): AbstractComponent<{}>),
  camera_noflash: (React.lazy(() => import('./CameraNoflash')): AbstractComponent<{}>),
  camera_noflash_alt: (React.lazy(() => import('./CameraNoflashAlt')): AbstractComponent<{}>),
  capture: (React.lazy(() => import('./Capture')): AbstractComponent<{}>),
  card_timeline: (React.lazy(() => import('./CardTimeline')): AbstractComponent<{}>),
  card_view: (React.lazy(() => import('./CardView')): AbstractComponent<{}>),
  carousel: (React.lazy(() => import('./Carousel')): AbstractComponent<{}>),
  cart: (React.lazy(() => import('./Cart')): AbstractComponent<{}>),
  cast: (React.lazy(() => import('./Cast')): AbstractComponent<{}>),
  chain: (React.lazy(() => import('./Chain')): AbstractComponent<{}>),
  chat_add: (React.lazy(() => import('./ChatAdd')): AbstractComponent<{}>),
  check: (React.lazy(() => import('./Check')): AbstractComponent<{}>),
  check_circle: (React.lazy(() => import('./CheckCircle')): AbstractComponent<{}>),
  check_circle_outside: (React.lazy(() => import('./CheckCircleOutside')): AbstractComponent<{}>),
  checkbox_checked: (React.lazy(() => import('./CheckboxChecked')): AbstractComponent<{}>),
  checkbox_empty: (React.lazy(() => import('./CheckboxEmpty')): AbstractComponent<{}>),
  chevron_close: (React.lazy(() => import('./ChevronClose')): AbstractComponent<{}>),
  chevron_down: (React.lazy(() => import('./ChevronDown')): AbstractComponent<{}>),
  chevron_down_circle: (React.lazy(() => import('./ChevronDownCircle')): AbstractComponent<{}>),
  chevron_down_double: (React.lazy(() => import('./ChevronDownDouble')): AbstractComponent<{}>),
  chevron_left: (React.lazy(() => import('./ChevronLeft')): AbstractComponent<{}>),
  chevron_left_circle: (React.lazy(() => import('./ChevronLeftCircle')): AbstractComponent<{}>),
  chevron_left_double: (React.lazy(() => import('./ChevronLeftDouble')): AbstractComponent<{}>),
  chevron_open: (React.lazy(() => import('./ChevronOpen')): AbstractComponent<{}>),
  chevron_right: (React.lazy(() => import('./ChevronRight')): AbstractComponent<{}>),
  chevron_right_circle: (React.lazy(() => import('./ChevronRightCircle')): AbstractComponent<{}>),
  chevron_right_double: (React.lazy(() => import('./ChevronRightDouble')): AbstractComponent<{}>),
  chevron_up: (React.lazy(() => import('./ChevronUp')): AbstractComponent<{}>),
  chevron_up_circle: (React.lazy(() => import('./ChevronUpCircle')): AbstractComponent<{}>),
  chevron_up_double: (React.lazy(() => import('./ChevronUpDouble')): AbstractComponent<{}>),
  circle: (React.lazy(() => import('./Circle')): AbstractComponent<{}>),
  circle_menu: (React.lazy(() => import('./CircleMenu')): AbstractComponent<{}>),
  circle_split: (React.lazy(() => import('./CircleSplit')): AbstractComponent<{}>),
  clipboard: (React.lazy(() => import('./Clipboard')): AbstractComponent<{}>),
  clipboard_add: (React.lazy(() => import('./ClipboardAdd')): AbstractComponent<{}>),
  clipboard_check: (React.lazy(() => import('./ClipboardCheck')): AbstractComponent<{}>),
  clipboard_copy: (React.lazy(() => import('./ClipboardCopy')): AbstractComponent<{}>),
  clipboard_cross: (React.lazy(() => import('./ClipboardCross')): AbstractComponent<{}>),
  clipboard_notes: (React.lazy(() => import('./ClipboardNotes')): AbstractComponent<{}>),
  clipboard_remove: (React.lazy(() => import('./ClipboardRemove')): AbstractComponent<{}>),
  clock: (React.lazy(() => import('./Clock')): AbstractComponent<{}>),
  close: (React.lazy(() => import('./Close')): AbstractComponent<{}>),
  cloud: (React.lazy(() => import('./Cloud')): AbstractComponent<{}>),
  cloud_disconnect: (React.lazy(() => import('./CloudDisconnect')): AbstractComponent<{}>),
  cloud_download: (React.lazy(() => import('./CloudDownload')): AbstractComponent<{}>),
  cloud_download_alt: (React.lazy(() => import('./CloudDownloadAlt')): AbstractComponent<{}>),
  cloud_upload: (React.lazy(() => import('./CloudUpload')): AbstractComponent<{}>),
  cloud_upload_alt: (React.lazy(() => import('./CloudUploadAlt')): AbstractComponent<{}>),
  code: (React.lazy(() => import('./Code')): AbstractComponent<{}>),
  coffee: (React.lazy(() => import('./Coffee')): AbstractComponent<{}>),
  coin: (React.lazy(() => import('./Coin')): AbstractComponent<{}>),
  coins: (React.lazy(() => import('./Coins')): AbstractComponent<{}>),
  compass: (React.lazy(() => import('./Compass')): AbstractComponent<{}>),
  component_add: (React.lazy(() => import('./ComponentAdd')): AbstractComponent<{}>),
  contacts: (React.lazy(() => import('./Contacts')): AbstractComponent<{}>),
  contract: (React.lazy(() => import('./Contract')): AbstractComponent<{}>),
  create: (React.lazy(() => import('./Create')): AbstractComponent<{}>),
  credit_card: (React.lazy(() => import('./CreditCard')): AbstractComponent<{}>),
  crop: (React.lazy(() => import('./Crop')): AbstractComponent<{}>),
  cross: (React.lazy(() => import('./Cross')): AbstractComponent<{}>),
  cross_circle: (React.lazy(() => import('./CrossCircle')): AbstractComponent<{}>),
  crosshair: (React.lazy(() => import('./Crosshair')): AbstractComponent<{}>),
  cube: (React.lazy(() => import('./Cube')): AbstractComponent<{}>),
  cylinder: (React.lazy(() => import('./Cylinder')): AbstractComponent<{}>),
  database: (React.lazy(() => import('./Database')): AbstractComponent<{}>),
  diamond: (React.lazy(() => import('./Diamond')): AbstractComponent<{}>),
  directions: (React.lazy(() => import('./Directions')): AbstractComponent<{}>),
  disc: (React.lazy(() => import('./Disc')): AbstractComponent<{}>),
  display: (React.lazy(() => import('./Display')): AbstractComponent<{}>),
  display_alt: (React.lazy(() => import('./DisplayAlt')): AbstractComponent<{}>),
  document: (React.lazy(() => import('./Document')): AbstractComponent<{}>),
  document_justified: (React.lazy(() => import('./DocumentJustified')): AbstractComponent<{}>),
  document_list: (React.lazy(() => import('./DocumentList')): AbstractComponent<{}>),
  document_stack: (React.lazy(() => import('./DocumentStack')): AbstractComponent<{}>),
  document_words: (React.lazy(() => import('./DocumentWords')): AbstractComponent<{}>),
  door: (React.lazy(() => import('./Door')): AbstractComponent<{}>),
  door_alt: (React.lazy(() => import('./DoorAlt')): AbstractComponent<{}>),
  download: (React.lazy(() => import('./Download')): AbstractComponent<{}>),
  download_alt: (React.lazy(() => import('./DownloadAlt')): AbstractComponent<{}>),
  downward: (React.lazy(() => import('./Downward')): AbstractComponent<{}>),
  drag: (React.lazy(() => import('./Drag')): AbstractComponent<{}>),
  drag_circle: (React.lazy(() => import('./DragCircle')): AbstractComponent<{}>),
  drag_vertical: (React.lazy(() => import('./DragVertical')): AbstractComponent<{}>),
  duplicate: (React.lazy(() => import('./Duplicate')): AbstractComponent<{}>),
  duplicate_alt: (React.lazy(() => import('./DuplicateAlt')): AbstractComponent<{}>),
  enter: (React.lazy(() => import('./Enter')): AbstractComponent<{}>),
  enter_alt: (React.lazy(() => import('./EnterAlt')): AbstractComponent<{}>),
  episodes: (React.lazy(() => import('./Episodes')): AbstractComponent<{}>),
  exit_left: (React.lazy(() => import('./ExitLeft')): AbstractComponent<{}>),
  exit_right: (React.lazy(() => import('./ExitRight')): AbstractComponent<{}>),
  expand: (React.lazy(() => import('./Expand')): AbstractComponent<{}>),
  expand_height: (React.lazy(() => import('./ExpandHeight')): AbstractComponent<{}>),
  expand_width: (React.lazy(() => import('./ExpandWidth')): AbstractComponent<{}>),
  external: (React.lazy(() => import('./External')): AbstractComponent<{}>),
  eye: (React.lazy(() => import('./Eye')): AbstractComponent<{}>),
  eye_closed: (React.lazy(() => import('./EyeClosed')): AbstractComponent<{}>),
  eye_no: (React.lazy(() => import('./EyeNo')): AbstractComponent<{}>),
  face_delighted: (React.lazy(() => import('./FaceDelighted')): AbstractComponent<{}>),
  face_happy: (React.lazy(() => import('./FaceHappy')): AbstractComponent<{}>),
  face_neutral: (React.lazy(() => import('./FaceNeutral')): AbstractComponent<{}>),
  face_sad: (React.lazy(() => import('./FaceSad')): AbstractComponent<{}>),
  file_download: (React.lazy(() => import('./FileDownload')): AbstractComponent<{}>),
  file_upload: (React.lazy(() => import('./FileUpload')): AbstractComponent<{}>),
  files_history: (React.lazy(() => import('./FilesHistory')): AbstractComponent<{}>),
  files_multi: (React.lazy(() => import('./FilesMulti')): AbstractComponent<{}>),
  files_stack: (React.lazy(() => import('./FilesStack')): AbstractComponent<{}>),
  film: (React.lazy(() => import('./Film')): AbstractComponent<{}>),
  filter: (React.lazy(() => import('./Filter')): AbstractComponent<{}>),
  filter_circle: (React.lazy(() => import('./FilterCircle')): AbstractComponent<{}>),
  filter_single: (React.lazy(() => import('./FilterSingle')): AbstractComponent<{}>),
  filtering: (React.lazy(() => import('./Filtering')): AbstractComponent<{}>),
  fingerprint: (React.lazy(() => import('./Fingerprint')): AbstractComponent<{}>),
  flag: (React.lazy(() => import('./Flag')): AbstractComponent<{}>),
  flame: (React.lazy(() => import('./Flame')): AbstractComponent<{}>),
  flame_alt: (React.lazy(() => import('./FlameAlt')): AbstractComponent<{}>),
  flip_view: (React.lazy(() => import('./FlipView')): AbstractComponent<{}>),
  floppy: (React.lazy(() => import('./Floppy')): AbstractComponent<{}>),
  folder_add: (React.lazy(() => import('./FolderAdd')): AbstractComponent<{}>),
  folder_closed: (React.lazy(() => import('./FolderClosed')): AbstractComponent<{}>),
  folder_minus: (React.lazy(() => import('./FolderMinus')): AbstractComponent<{}>),
  folder_open: (React.lazy(() => import('./FolderOpen')): AbstractComponent<{}>),
  fork_git: (React.lazy(() => import('./ForkGit')): AbstractComponent<{}>),
  forward: (React.lazy(() => import('./Forward')): AbstractComponent<{}>),
  frame: (React.lazy(() => import('./Frame')): AbstractComponent<{}>),
  fullscreen: (React.lazy(() => import('./Fullscreen')): AbstractComponent<{}>),
  funnel: (React.lazy(() => import('./Funnel')): AbstractComponent<{}>),
  gauge: (React.lazy(() => import('./Gauge')): AbstractComponent<{}>),
  gift: (React.lazy(() => import('./Gift')): AbstractComponent<{}>),
  globe: (React.lazy(() => import('./Globe')): AbstractComponent<{}>),
  gps: (React.lazy(() => import('./Gps')): AbstractComponent<{}>),
  grab: (React.lazy(() => import('./Grab')): AbstractComponent<{}>),
  graph_bar: (React.lazy(() => import('./GraphBar')): AbstractComponent<{}>),
  graph_box: (React.lazy(() => import('./GraphBox')): AbstractComponent<{}>),
  graph_increase: (React.lazy(() => import('./GraphIncrease')): AbstractComponent<{}>),
  grid: (React.lazy(() => import('./Grid')): AbstractComponent<{}>),
  grid_circles: (React.lazy(() => import('./GridCircles')): AbstractComponent<{}>),
  grid_circles_add: (React.lazy(() => import('./GridCirclesAdd')): AbstractComponent<{}>),
  grid_small: (React.lazy(() => import('./GridSmall')): AbstractComponent<{}>),
  grid_squares: (React.lazy(() => import('./GridSquares')): AbstractComponent<{}>),
  grid_squares_add: (React.lazy(() => import('./GridSquaresAdd')): AbstractComponent<{}>),
  hand: (React.lazy(() => import('./Hand')): AbstractComponent<{}>),
  harddrive: (React.lazy(() => import('./Harddrive')): AbstractComponent<{}>),
  hash: (React.lazy(() => import('./Hash')): AbstractComponent<{}>),
  heart: (React.lazy(() => import('./Heart')): AbstractComponent<{}>),
  heart_rate: (React.lazy(() => import('./HeartRate')): AbstractComponent<{}>),
  heart_remove: (React.lazy(() => import('./HeartRemove')): AbstractComponent<{}>),
  height: (React.lazy(() => import('./Height')): AbstractComponent<{}>),
  hierarchy: (React.lazy(() => import('./Hierarchy')): AbstractComponent<{}>),
  home: (React.lazy(() => import('./Home')): AbstractComponent<{}>),
  home_alt: (React.lazy(() => import('./HomeAlt')): AbstractComponent<{}>),
  home_check: (React.lazy(() => import('./HomeCheck')): AbstractComponent<{}>),
  home_door: (React.lazy(() => import('./HomeDoor')): AbstractComponent<{}>),
  import: (React.lazy(() => import('./Import')): AbstractComponent<{}>),
  inbox: (React.lazy(() => import('./Inbox')): AbstractComponent<{}>),
  inbox_alt: (React.lazy(() => import('./InboxAlt')): AbstractComponent<{}>),
  info_circle: (React.lazy(() => import('./InfoCircle')): AbstractComponent<{}>),
  iphone_landscape: (React.lazy(() => import('./IphoneLandscape')): AbstractComponent<{}>),
  iphone_portrait: (React.lazy(() => import('./IphonePortrait')): AbstractComponent<{}>),
  jump_backward: (React.lazy(() => import('./JumpBackward')): AbstractComponent<{}>),
  jump_forward: (React.lazy(() => import('./JumpForward')): AbstractComponent<{}>),
  jump_left: (React.lazy(() => import('./JumpLeft')): AbstractComponent<{}>),
  jump_right: (React.lazy(() => import('./JumpRight')): AbstractComponent<{}>),
  keyboard: (React.lazy(() => import('./Keyboard')): AbstractComponent<{}>),
  laptop: (React.lazy(() => import('./Laptop')): AbstractComponent<{}>),
  lightbulb: (React.lazy(() => import('./Lightbulb')): AbstractComponent<{}>),
  lightbulb_on: (React.lazy(() => import('./LightbulbOn')): AbstractComponent<{}>),
  lightning: (React.lazy(() => import('./Lightning')): AbstractComponent<{}>),
  lightning_alt: (React.lazy(() => import('./LightningAlt')): AbstractComponent<{}>),
  lineweight: (React.lazy(() => import('./Lineweight')): AbstractComponent<{}>),
  link: (React.lazy(() => import('./Link')): AbstractComponent<{}>),
  link_alt: (React.lazy(() => import('./LinkAlt')): AbstractComponent<{}>),
  link_broken: (React.lazy(() => import('./LinkBroken')): AbstractComponent<{}>),
  link_horizontal: (React.lazy(() => import('./LinkHorizontal')): AbstractComponent<{}>),
  link_vertical: (React.lazy(() => import('./LinkVertical')): AbstractComponent<{}>),
  list: (React.lazy(() => import('./List')): AbstractComponent<{}>),
  list_add: (React.lazy(() => import('./ListAdd')): AbstractComponent<{}>),
  list_numbered: (React.lazy(() => import('./ListNumbered')): AbstractComponent<{}>),
  loader: (React.lazy(() => import('./Loader')): AbstractComponent<{}>),
  location: (React.lazy(() => import('./Location')): AbstractComponent<{}>),
  lock: (React.lazy(() => import('./Lock')): AbstractComponent<{}>),
  lock_open: (React.lazy(() => import('./LockOpen')): AbstractComponent<{}>),
  mail: (React.lazy(() => import('./Mail')): AbstractComponent<{}>),
  mail_add: (React.lazy(() => import('./MailAdd')): AbstractComponent<{}>),
  mail_delete: (React.lazy(() => import('./MailDelete')): AbstractComponent<{}>),
  mail_minus: (React.lazy(() => import('./MailMinus')): AbstractComponent<{}>),
  mail_new: (React.lazy(() => import('./MailNew')): AbstractComponent<{}>),
  mail_open: (React.lazy(() => import('./MailOpen')): AbstractComponent<{}>),
  mail_remove: (React.lazy(() => import('./MailRemove')): AbstractComponent<{}>),
  marquee: (React.lazy(() => import('./Marquee')): AbstractComponent<{}>),
  maximise: (React.lazy(() => import('./Maximise')): AbstractComponent<{}>),
  menu_hamburger: (React.lazy(() => import('./MenuHamburger')): AbstractComponent<{}>),
  menu_horizontal: (React.lazy(() => import('./MenuHorizontal')): AbstractComponent<{}>),
  menu_vertical: (React.lazy(() => import('./MenuVertical')): AbstractComponent<{}>),
  message: (React.lazy(() => import('./Message')): AbstractComponent<{}>),
  message_writing: (React.lazy(() => import('./MessageWriting')): AbstractComponent<{}>),
  microphone: (React.lazy(() => import('./Microphone')): AbstractComponent<{}>),
  microphone_disabled: (React.lazy(() => import('./MicrophoneDisabled')): AbstractComponent<{}>),
  microphone_muted: (React.lazy(() => import('./MicrophoneMuted')): AbstractComponent<{}>),
  midpoint: (React.lazy(() => import('./Midpoint')): AbstractComponent<{}>),
  mini_player: (React.lazy(() => import('./MiniPlayer')): AbstractComponent<{}>),
  minimise: (React.lazy(() => import('./Minimise')): AbstractComponent<{}>),
  minus: (React.lazy(() => import('./Minus')): AbstractComponent<{}>),
  minus_circle: (React.lazy(() => import('./MinusCircle')): AbstractComponent<{}>),
  moon: (React.lazy(() => import('./Moon')): AbstractComponent<{}>),
  move: (React.lazy(() => import('./Move')): AbstractComponent<{}>),
  newspaper: (React.lazy(() => import('./Newspaper')): AbstractComponent<{}>),
  no_sign: (React.lazy(() => import('./NoSign')): AbstractComponent<{}>),
  notebook: (React.lazy(() => import('./Notebook')): AbstractComponent<{}>),
  notification: (React.lazy(() => import('./Notification')): AbstractComponent<{}>),
  nut: (React.lazy(() => import('./Nut')): AbstractComponent<{}>),
  pages: (React.lazy(() => import('./Pages')): AbstractComponent<{}>),
  panel_bottom: (React.lazy(() => import('./PanelBottom')): AbstractComponent<{}>),
  panel_center: (React.lazy(() => import('./PanelCenter')): AbstractComponent<{}>),
  panel_left: (React.lazy(() => import('./PanelLeft')): AbstractComponent<{}>),
  panel_right: (React.lazy(() => import('./PanelRight')): AbstractComponent<{}>),
  panel_sectioned: (React.lazy(() => import('./PanelSectioned')): AbstractComponent<{}>),
  panel_top: (React.lazy(() => import('./PanelTop')): AbstractComponent<{}>),
  paper: (React.lazy(() => import('./Paper')): AbstractComponent<{}>),
  paper_folded: (React.lazy(() => import('./PaperFolded')): AbstractComponent<{}>),
  paper_plane: (React.lazy(() => import('./PaperPlane')): AbstractComponent<{}>),
  paper_plane_alt: (React.lazy(() => import('./PaperPlaneAlt')): AbstractComponent<{}>),
  paperclip: (React.lazy(() => import('./Paperclip')): AbstractComponent<{}>),
  paragraph_center: (React.lazy(() => import('./ParagraphCenter')): AbstractComponent<{}>),
  paragraph_end: (React.lazy(() => import('./ParagraphEnd')): AbstractComponent<{}>),
  paragraph_left: (React.lazy(() => import('./ParagraphLeft')): AbstractComponent<{}>),
  paragraph_right: (React.lazy(() => import('./ParagraphRight')): AbstractComponent<{}>),
  paragraph_start: (React.lazy(() => import('./ParagraphStart')): AbstractComponent<{}>),
  pen: (React.lazy(() => import('./Pen')): AbstractComponent<{}>),
  phone_landscape: (React.lazy(() => import('./PhoneLandscape')): AbstractComponent<{}>),
  phone_portrait: (React.lazy(() => import('./PhonePortrait')): AbstractComponent<{}>),
  picture: (React.lazy(() => import('./Picture')): AbstractComponent<{}>),
  pie_half: (React.lazy(() => import('./PieHalf')): AbstractComponent<{}>),
  pie_quarter: (React.lazy(() => import('./PieQuarter')): AbstractComponent<{}>),
  pie_third: (React.lazy(() => import('./PieThird')): AbstractComponent<{}>),
  play_button: (React.lazy(() => import('./PlayButton')): AbstractComponent<{}>),
  plus: (React.lazy(() => import('./Plus')): AbstractComponent<{}>),
  plus_circle: (React.lazy(() => import('./PlusCircle')): AbstractComponent<{}>),
  postcard: (React.lazy(() => import('./Postcard')): AbstractComponent<{}>),
  printer: (React.lazy(() => import('./Printer')): AbstractComponent<{}>),
  projector: (React.lazy(() => import('./Projector')): AbstractComponent<{}>),
  pull_down: (React.lazy(() => import('./PullDown')): AbstractComponent<{}>),
  pull_left: (React.lazy(() => import('./PullLeft')): AbstractComponent<{}>),
  pull_right: (React.lazy(() => import('./PullRight')): AbstractComponent<{}>),
  pull_up: (React.lazy(() => import('./PullUp')): AbstractComponent<{}>),
  push_down: (React.lazy(() => import('./PushDown')): AbstractComponent<{}>),
  push_left: (React.lazy(() => import('./PushLeft')): AbstractComponent<{}>),
  push_right: (React.lazy(() => import('./PushRight')): AbstractComponent<{}>),
  push_up: (React.lazy(() => import('./PushUp')): AbstractComponent<{}>),
  question_circle: (React.lazy(() => import('./QuestionCircle')): AbstractComponent<{}>),
  radio_on: (React.lazy(() => import('./RadioOn')): AbstractComponent<{}>),
  receipt: (React.lazy(() => import('./Receipt')): AbstractComponent<{}>),
  record: (React.lazy(() => import('./Record')): AbstractComponent<{}>),
  redo: (React.lazy(() => import('./Redo')): AbstractComponent<{}>),
  refresh: (React.lazy(() => import('./Refresh')): AbstractComponent<{}>),
  refresh_alt: (React.lazy(() => import('./RefreshAlt')): AbstractComponent<{}>),
  replicate: (React.lazy(() => import('./Replicate')): AbstractComponent<{}>),
  replicate_alt: (React.lazy(() => import('./ReplicateAlt')): AbstractComponent<{}>),
  reset: (React.lazy(() => import('./Reset')): AbstractComponent<{}>),
  reset_alt: (React.lazy(() => import('./ResetAlt')): AbstractComponent<{}>),
  reset_forward: (React.lazy(() => import('./ResetForward')): AbstractComponent<{}>),
  reset_hard: (React.lazy(() => import('./ResetHard')): AbstractComponent<{}>),
  reset_temporary: (React.lazy(() => import('./ResetTemporary')): AbstractComponent<{}>),
  retweet: (React.lazy(() => import('./Retweet')): AbstractComponent<{}>),
  reuse: (React.lazy(() => import('./Reuse')): AbstractComponent<{}>),
  reverse: (React.lazy(() => import('./Reverse')): AbstractComponent<{}>),
  reverse_alt: (React.lazy(() => import('./ReverseAlt')): AbstractComponent<{}>),
  revert: (React.lazy(() => import('./Revert')): AbstractComponent<{}>),
  rocket: (React.lazy(() => import('./Rocket')): AbstractComponent<{}>),
  ruler: (React.lazy(() => import('./Ruler')): AbstractComponent<{}>),
  scale: (React.lazy(() => import('./Scale')): AbstractComponent<{}>),
  scale_contract: (React.lazy(() => import('./ScaleContract')): AbstractComponent<{}>),
  scale_extend: (React.lazy(() => import('./ScaleExtend')): AbstractComponent<{}>),
  scalpel: (React.lazy(() => import('./Scalpel')): AbstractComponent<{}>),
  search: (React.lazy(() => import('./Search')): AbstractComponent<{}>),
  server: (React.lazy(() => import('./Server')): AbstractComponent<{}>),
  settings: (React.lazy(() => import('./Settings')): AbstractComponent<{}>),
  share: (React.lazy(() => import('./Share')): AbstractComponent<{}>),
  share_alt: (React.lazy(() => import('./ShareAlt')): AbstractComponent<{}>),
  shuffle: (React.lazy(() => import('./Shuffle')): AbstractComponent<{}>),
  side_menu: (React.lazy(() => import('./SideMenu')): AbstractComponent<{}>),
  slash_backward: (React.lazy(() => import('./SlashBackward')): AbstractComponent<{}>),
  slash_forward: (React.lazy(() => import('./SlashForward')): AbstractComponent<{}>),
  sliders: (React.lazy(() => import('./Sliders')): AbstractComponent<{}>),
  sort: (React.lazy(() => import('./Sort')): AbstractComponent<{}>),
  sort_alt: (React.lazy(() => import('./SortAlt')): AbstractComponent<{}>),
  speaker: (React.lazy(() => import('./Speaker')): AbstractComponent<{}>),
  speech_bubble: (React.lazy(() => import('./SpeechBubble')): AbstractComponent<{}>),
  speech_typing: (React.lazy(() => import('./SpeechTyping')): AbstractComponent<{}>),
  split: (React.lazy(() => import('./Split')): AbstractComponent<{}>),
  split_three: (React.lazy(() => import('./SplitThree')): AbstractComponent<{}>),
  star: (React.lazy(() => import('./Star')): AbstractComponent<{}>),
  sun: (React.lazy(() => import('./Sun')): AbstractComponent<{}>),
  support: (React.lazy(() => import('./Support')): AbstractComponent<{}>),
  swap: (React.lazy(() => import('./Swap')): AbstractComponent<{}>),
  switch: (React.lazy(() => import('./Switch')): AbstractComponent<{}>),
  table: (React.lazy(() => import('./Table')): AbstractComponent<{}>),
  table_header: (React.lazy(() => import('./TableHeader')): AbstractComponent<{}>),
  tag: (React.lazy(() => import('./Tag')): AbstractComponent<{}>),
  tag_milestone: (React.lazy(() => import('./TagMilestone')): AbstractComponent<{}>),
  tags: (React.lazy(() => import('./Tags')): AbstractComponent<{}>),
  target: (React.lazy(() => import('./Target')): AbstractComponent<{}>),
  thread: (React.lazy(() => import('./Thread')): AbstractComponent<{}>),
  thumbs_down: (React.lazy(() => import('./ThumbsDown')): AbstractComponent<{}>),
  thumbs_up: (React.lazy(() => import('./ThumbsUp')): AbstractComponent<{}>),
  ticket: (React.lazy(() => import('./Ticket')): AbstractComponent<{}>),
  timeline: (React.lazy(() => import('./Timeline')): AbstractComponent<{}>),
  todo: (React.lazy(() => import('./Todo')): AbstractComponent<{}>),
  toggle: (React.lazy(() => import('./Toggle')): AbstractComponent<{}>),
  toggles: (React.lazy(() => import('./Toggles')): AbstractComponent<{}>),
  translate: (React.lazy(() => import('./Translate')): AbstractComponent<{}>),
  trash: (React.lazy(() => import('./Trash')): AbstractComponent<{}>),
  trash_alt: (React.lazy(() => import('./TrashAlt')): AbstractComponent<{}>),
  trophy: (React.lazy(() => import('./Trophy')): AbstractComponent<{}>),
  tv_mode: (React.lazy(() => import('./TvMode')): AbstractComponent<{}>),
  unarchive: (React.lazy(() => import('./Unarchive')): AbstractComponent<{}>),
  undo: (React.lazy(() => import('./Undo')): AbstractComponent<{}>),
  undo_history: (React.lazy(() => import('./UndoHistory')): AbstractComponent<{}>),
  unlink_horizontal: (React.lazy(() => import('./UnlinkHorizontal')): AbstractComponent<{}>),
  unlink_vertical: (React.lazy(() => import('./UnlinkVertical')): AbstractComponent<{}>),
  upload: (React.lazy(() => import('./Upload')): AbstractComponent<{}>),
  upload_alt: (React.lazy(() => import('./UploadAlt')): AbstractComponent<{}>),
  upward: (React.lazy(() => import('./Upward')): AbstractComponent<{}>),
  user: (React.lazy(() => import('./User')): AbstractComponent<{}>),
  user_add: (React.lazy(() => import('./UserAdd')): AbstractComponent<{}>),
  user_circle: (React.lazy(() => import('./UserCircle')): AbstractComponent<{}>),
  user_male: (React.lazy(() => import('./UserMale')): AbstractComponent<{}>),
  user_male_circle: (React.lazy(() => import('./UserMaleCircle')): AbstractComponent<{}>),
  user_remove: (React.lazy(() => import('./UserRemove')): AbstractComponent<{}>),
  users: (React.lazy(() => import('./Users')): AbstractComponent<{}>),
  venn: (React.lazy(() => import('./Venn')): AbstractComponent<{}>),
  version: (React.lazy(() => import('./Version')): AbstractComponent<{}>),
  versions: (React.lazy(() => import('./Versions')): AbstractComponent<{}>),
  video: (React.lazy(() => import('./Video')): AbstractComponent<{}>),
  volume_0: (React.lazy(() => import('./Volume0')): AbstractComponent<{}>),
  volume_add: (React.lazy(() => import('./VolumeAdd')): AbstractComponent<{}>),
  volume_disabled: (React.lazy(() => import('./VolumeDisabled')): AbstractComponent<{}>),
  volume_high: (React.lazy(() => import('./VolumeHigh')): AbstractComponent<{}>),
  volume_low: (React.lazy(() => import('./VolumeLow')): AbstractComponent<{}>),
  volume_minus: (React.lazy(() => import('./VolumeMinus')): AbstractComponent<{}>),
  volume_muted: (React.lazy(() => import('./VolumeMuted')): AbstractComponent<{}>),
  wallet: (React.lazy(() => import('./Wallet')): AbstractComponent<{}>),
  warning_circle: (React.lazy(() => import('./WarningCircle')): AbstractComponent<{}>),
  warning_hex: (React.lazy(() => import('./WarningHex')): AbstractComponent<{}>),
  warning_triangle: (React.lazy(() => import('./WarningTriangle')): AbstractComponent<{}>),
  waves: (React.lazy(() => import('./Waves')): AbstractComponent<{}>),
  width: (React.lazy(() => import('./Width')): AbstractComponent<{}>),
  wifi: (React.lazy(() => import('./Wifi')): AbstractComponent<{}>),
  wifi_error: (React.lazy(() => import('./WifiError')): AbstractComponent<{}>),
  wifi_none: (React.lazy(() => import('./WifiNone')): AbstractComponent<{}>),
  window: (React.lazy(() => import('./Window')): AbstractComponent<{}>),
  window_collapse_left: (React.lazy(() => import('./WindowCollapseLeft')): AbstractComponent<{}>),
  window_collapse_right: (React.lazy(() => import('./WindowCollapseRight')): AbstractComponent<{}>),
  window_content: (React.lazy(() => import('./WindowContent')): AbstractComponent<{}>),
  wrap_back: (React.lazy(() => import('./WrapBack')): AbstractComponent<{}>),
  wrap_forward: (React.lazy(() => import('./WrapForward')): AbstractComponent<{}>),
  write: (React.lazy(() => import('./Write')): AbstractComponent<{}>),
  zoom_cancel: (React.lazy(() => import('./ZoomCancel')): AbstractComponent<{}>),
  zoom_in: (React.lazy(() => import('./ZoomIn')): AbstractComponent<{}>),
  zoom_out: (React.lazy(() => import('./ZoomOut')): AbstractComponent<{}>),
  zoom_reset: (React.lazy(() => import('./ZoomReset')): AbstractComponent<{}>),
};
