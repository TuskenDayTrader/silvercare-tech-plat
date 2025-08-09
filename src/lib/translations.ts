// Translation data for the website content
export interface Translations {
  en: TranslationContent
  es: TranslationContent
  zh: TranslationContent
}

export interface TranslationContent {
  // Navigation
  home: string
  register: string
  gallery: string
  learnMore: string
  seniorResources: string
  
  // Homepage content
  tagline: string
  problemStatement: string
  solutionTitle: string
  solutionDescription: string
  impactTitle: string
  impactDescription: string
  signUpCTA: string
  
  // Registration page
  registerTitle: string
  familyMemberName: string
  lovedOneName: string
  lovedOneLocation: string
  preferredTime: string
  contactEmail: string
  submitButton: string
  instructions: string
  confirmationMessage: string
  
  // Gallery page
  galleryTitle: string
  gallerySubtitle: string
  joinJoyCTA: string
  
  // Learn More page
  understandingTitle: string
  roleOfTechTitle: string
  benefitsTitle: string
  detailedAnalysisTitle: string
  
  // Senior Resources page
  resourcesTitle: string
  resourcesSubtitle: string
  addResourceButton: string
  editResourceButton: string
  deleteResourceButton: string
  
  // Accessibility
  accessibilityMenu: string
  language: string
  fontSize: string
  highContrast: string
  screenReader: string
  voiceSpeed: string
  autoRead: string
  reducedMotion: string
  subtitles: string
  signLanguage: string
  resetSettings: string
  
  // Voice commands
  voiceCommandsHelp: string
  listenButton: string
  stopListening: string
  
  // Common actions
  close: string
  save: string
  cancel: string
  yes: string
  no: string
  loading: string
  error: string
  success: string
  
  // Time slots
  timeSlots: string[]
  
  // Form validation
  requiredField: string
  invalidEmail: string
  
  // Image captions
  galleryImageCaptions: string[]
}

export const translations: Translations = {
  en: {
    // Navigation
    home: "Home",
    register: "Register to Connect",
    gallery: "Moments of Joy",
    learnMore: "Learn More",
    seniorResources: "Senior Happiness & Engagement Resources",
    
    // Homepage content
    tagline: "Connecting Generations, One Call at a Time",
    problemStatement: "Loneliness affects 60% of seniors in care facilities. Limited tech access disconnects them from families.",
    solutionTitle: "Our Solution",
    solutionDescription: "We bring all the tech—our equipment, our setup. Seniors just bring their face and smiles. Connect via video calls, WhatsApp, or social media with customizable packages.",
    impactTitle: "The Impact",
    impactDescription: "Reduces isolation, strengthens family bonds, and creates priceless, heartwarming moments for seniors and their loved ones.",
    signUpCTA: "Sign Up to Connect Your Loved One",
    
    // Registration page
    registerTitle: "Register to Connect",
    familyMemberName: "Family Member Name",
    lovedOneName: "Loved One's Name",
    lovedOneLocation: "Loved One's Location",
    preferredTime: "Preferred Connection Time",
    contactEmail: "Contact Email",
    submitButton: "Submit Registration",
    instructions: "We handle all tech setup. Just provide details and pick a time.",
    confirmationMessage: "Thank you! We'll confirm your slot soon.",
    
    // Gallery page
    galleryTitle: "Moments of Joy",
    gallerySubtitle: "Celebrating connections and cherished memories",
    joinJoyCTA: "Join the Joy - Sign Up Now",
    
    // Learn More page
    understandingTitle: "Understanding Senior Loneliness",
    roleOfTechTitle: "The Role of Technology",
    benefitsTitle: "Benefits for Users and Families",
    detailedAnalysisTitle: "Detailed Analysis and Insights",
    
    // Senior Resources page
    resourcesTitle: "Senior Happiness & Engagement Resources",
    resourcesSubtitle: "Evidence-based strategies to enhance well-being for seniors in care facilities",
    addResourceButton: "Add New Resource",
    editResourceButton: "Edit",
    deleteResourceButton: "Delete",
    
    // Accessibility
    accessibilityMenu: "Accessibility Settings",
    language: "Language",
    fontSize: "Font Size",
    highContrast: "High Contrast",
    screenReader: "Screen Reader Support",
    voiceSpeed: "Voice Speed",
    autoRead: "Auto-Read Content",
    reducedMotion: "Reduce Motion",
    subtitles: "Show Subtitles",
    signLanguage: "Sign Language Interpreter",
    resetSettings: "Reset to Defaults",
    
    // Voice commands
    voiceCommandsHelp: "Voice Commands Available",
    listenButton: "Start Listening",
    stopListening: "Stop Listening",
    
    // Common actions
    close: "Close",
    save: "Save",
    cancel: "Cancel",
    yes: "Yes",
    no: "No",
    loading: "Loading...",
    error: "Error",
    success: "Success",
    
    // Time slots
    timeSlots: [
      "7:00 AM EST", "7:30 AM EST", "8:00 AM EST", "8:30 AM EST", "9:00 AM EST", "9:30 AM EST",
      "10:00 AM EST", "10:30 AM EST", "11:00 AM EST", "11:30 AM EST", "12:00 PM EST", "12:30 PM EST",
      "1:00 PM EST", "1:30 PM EST", "2:00 PM EST", "2:30 PM EST", "3:00 PM EST", "3:30 PM EST",
      "4:00 PM EST", "4:30 PM EST", "5:00 PM EST", "5:30 PM EST", "6:00 PM EST"
    ],
    
    // Form validation
    requiredField: "This field is required",
    invalidEmail: "Please enter a valid email address",
    
    // Image captions
    galleryImageCaptions: [
      "A grandmother smiling during a video call with her grandchildren",
      "Senior residents enjoying a group video chat with family members",
      "An elderly man laughing while using a tablet to connect with loved ones",
      "Caregivers helping seniors set up technology for family calls",
      "A happy moment captured during a virtual family reunion",
      "Seniors participating in online activities with their families"
    ]
  },
  
  es: {
    // Navigation
    home: "Inicio",
    register: "Registrarse para Conectar",
    gallery: "Momentos de Alegría",
    learnMore: "Aprende Más",
    seniorResources: "Recursos de Felicidad y Compromiso para Personas Mayores",
    
    // Homepage content
    tagline: "Conectando Generaciones, Una Llamada a la Vez",
    problemStatement: "La soledad afecta al 60% de las personas mayores en centros de cuidado. El acceso limitado a la tecnología los desconecta de sus familias.",
    solutionTitle: "Nuestra Solución",
    solutionDescription: "Traemos toda la tecnología: nuestro equipo, nuestra configuración. Los adultos mayores solo traen su rostro y sonrisas. Conéctate a través de videollamadas, WhatsApp o redes sociales con paquetes personalizables.",
    impactTitle: "El Impacto",
    impactDescription: "Reduce el aislamiento, fortalece los lazos familiares y crea momentos invaluables y emotivos para los adultos mayores y sus seres queridos.",
    signUpCTA: "Regístrate para Conectar a tu Ser Querido",
    
    // Registration page
    registerTitle: "Registrarse para Conectar",
    familyMemberName: "Nombre del Familiar",
    lovedOneName: "Nombre del Ser Querido",
    lovedOneLocation: "Ubicación del Ser Querido",
    preferredTime: "Hora de Conexión Preferida",
    contactEmail: "Correo Electrónico de Contacto",
    submitButton: "Enviar Registro",
    instructions: "Nos encargamos de toda la configuración tecnológica. Solo proporciona los detalles y elige una hora.",
    confirmationMessage: "¡Gracias! Confirmaremos tu horario pronto.",
    
    // Gallery page
    galleryTitle: "Momentos de Alegría",
    gallerySubtitle: "Celebrando conexiones y recuerdos preciados",
    joinJoyCTA: "Únete a la Alegría - Regístrate Ahora",
    
    // Learn More page
    understandingTitle: "Entendiendo la Soledad de las Personas Mayores",
    roleOfTechTitle: "El Papel de la Tecnología",
    benefitsTitle: "Beneficios para Usuarios y Familias",
    detailedAnalysisTitle: "Análisis Detallado y Perspectivas",
    
    // Senior Resources page
    resourcesTitle: "Recursos de Felicidad y Compromiso para Personas Mayores",
    resourcesSubtitle: "Estrategias basadas en evidencia para mejorar el bienestar de las personas mayores en centros de cuidado",
    addResourceButton: "Agregar Nuevo Recurso",
    editResourceButton: "Editar",
    deleteResourceButton: "Eliminar",
    
    // Accessibility
    accessibilityMenu: "Configuración de Accesibilidad",
    language: "Idioma",
    fontSize: "Tamaño de Fuente",
    highContrast: "Alto Contraste",
    screenReader: "Soporte para Lector de Pantalla",
    voiceSpeed: "Velocidad de Voz",
    autoRead: "Lectura Automática de Contenido",
    reducedMotion: "Reducir Movimiento",
    subtitles: "Mostrar Subtítulos",
    signLanguage: "Intérprete de Lenguaje de Señas",
    resetSettings: "Restablecer a Predeterminados",
    
    // Voice commands
    voiceCommandsHelp: "Comandos de Voz Disponibles",
    listenButton: "Comenzar a Escuchar",
    stopListening: "Dejar de Escuchar",
    
    // Common actions
    close: "Cerrar",
    save: "Guardar",
    cancel: "Cancelar",
    yes: "Sí",
    no: "No",
    loading: "Cargando...",
    error: "Error",
    success: "Éxito",
    
    // Time slots
    timeSlots: [
      "7:00 AM EST", "7:30 AM EST", "8:00 AM EST", "8:30 AM EST", "9:00 AM EST", "9:30 AM EST",
      "10:00 AM EST", "10:30 AM EST", "11:00 AM EST", "11:30 AM EST", "12:00 PM EST", "12:30 PM EST",
      "1:00 PM EST", "1:30 PM EST", "2:00 PM EST", "2:30 PM EST", "3:00 PM EST", "3:30 PM EST",
      "4:00 PM EST", "4:30 PM EST", "5:00 PM EST", "5:30 PM EST", "6:00 PM EST"
    ],
    
    // Form validation
    requiredField: "Este campo es obligatorio",
    invalidEmail: "Por favor ingresa una dirección de correo válida",
    
    // Image captions
    galleryImageCaptions: [
      "Una abuela sonriendo durante una videollamada con sus nietos",
      "Residentes mayores disfrutando de un chat grupal por video con familiares",
      "Un hombre mayor riéndose mientras usa una tableta para conectar con seres queridos",
      "Cuidadores ayudando a personas mayores a configurar tecnología para llamadas familiares",
      "Un momento feliz capturado durante una reunión familiar virtual",
      "Personas mayores participando en actividades en línea con sus familias"
    ]
  },
  
  zh: {
    // Navigation
    home: "首页",
    register: "注册连接",
    gallery: "欢乐时光",
    learnMore: "了解更多",
    seniorResources: "老年人幸福与参与资源",
    
    // Homepage content
    tagline: "连接世代，一次通话",
    problemStatement: "孤独感影响60%的护理机构老年人。有限的技术接入使他们与家人失去联系。",
    solutionTitle: "我们的解决方案",
    solutionDescription: "我们提供所有技术设备和设置。老年人只需带来他们的笑脸。通过视频通话、WhatsApp或社交媒体连接，提供可定制的套餐。",
    impactTitle: "影响",
    impactDescription: "减少孤立感，加强家庭纽带，为老年人及其亲人创造无价的温馨时刻。",
    signUpCTA: "注册连接您的亲人",
    
    // Registration page
    registerTitle: "注册连接",
    familyMemberName: "家庭成员姓名",
    lovedOneName: "亲人姓名",
    lovedOneLocation: "亲人位置",
    preferredTime: "首选连接时间",
    contactEmail: "联系邮箱",
    submitButton: "提交注册",
    instructions: "我们处理所有技术设置。只需提供详细信息并选择时间。",
    confirmationMessage: "谢谢！我们很快会确认您的时间段。",
    
    // Gallery page
    galleryTitle: "欢乐时光",
    gallerySubtitle: "庆祝连接和珍贵回忆",
    joinJoyCTA: "加入欢乐 - 立即注册",
    
    // Learn More page
    understandingTitle: "理解老年人孤独",
    roleOfTechTitle: "技术的作用",
    benefitsTitle: "用户和家庭的益处",
    detailedAnalysisTitle: "详细分析和见解",
    
    // Senior Resources page
    resourcesTitle: "老年人幸福与参与资源",
    resourcesSubtitle: "基于证据的策略，提升护理机构老年人的福祉",
    addResourceButton: "添加新资源",
    editResourceButton: "编辑",
    deleteResourceButton: "删除",
    
    // Accessibility
    accessibilityMenu: "无障碍设置",
    language: "语言",
    fontSize: "字体大小",
    highContrast: "高对比度",
    screenReader: "屏幕阅读器支持",
    voiceSpeed: "语音速度",
    autoRead: "自动朗读内容",
    reducedMotion: "减少动效",
    subtitles: "显示字幕",
    signLanguage: "手语翻译",
    resetSettings: "重置为默认",
    
    // Voice commands
    voiceCommandsHelp: "可用语音命令",
    listenButton: "开始聆听",
    stopListening: "停止聆听",
    
    // Common actions
    close: "关闭",
    save: "保存",
    cancel: "取消",
    yes: "是",
    no: "否",
    loading: "加载中...",
    error: "错误",
    success: "成功",
    
    // Time slots
    timeSlots: [
      "东部时间上午7:00", "东部时间上午7:30", "东部时间上午8:00", "东部时间上午8:30", "东部时间上午9:00", "东部时间上午9:30",
      "东部时间上午10:00", "东部时间上午10:30", "东部时间上午11:00", "东部时间上午11:30", "东部时间中午12:00", "东部时间下午12:30",
      "东部时间下午1:00", "东部时间下午1:30", "东部时间下午2:00", "东部时间下午2:30", "东部时间下午3:00", "东部时间下午3:30",
      "东部时间下午4:00", "东部时间下午4:30", "东部时间下午5:00", "东部时间下午5:30", "东部时间下午6:00"
    ],
    
    // Form validation
    requiredField: "此字段为必填项",
    invalidEmail: "请输入有效的邮箱地址",
    
    // Image captions
    galleryImageCaptions: [
      "祖母在与孙子们视频通话时微笑",
      "老年居民享受与家人的群组视频聊天",
      "一位老人在使用平板电脑与亲人连接时大笑",
      "护理人员帮助老年人设置技术设备进行家庭通话",
      "虚拟家庭聚会中捕捉到的快乐时刻",
      "老年人与家人一起参与在线活动"
    ]
  }
}

// Hook to use translations
export function useTranslation(language: 'en' | 'es' | 'zh') {
  const t = translations[language]
  
  return {
    t,
    language
  }
}