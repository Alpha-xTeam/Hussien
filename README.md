# موقع Portfolio حسين

موقع Portfolio احترافي مبني باستخدام Next.js، TypeScript، وTailwind CSS مع قاعدة بيانات Supabase.

## المميزات

- ✨ تصميم احترافي ومتجاوب
- 🎨 واجهة مستخدم حديثة مع Tailwind CSS
- 🚀 أداء عالي مع Next.js
- 🔒 أمان معقول مع TypeScript
- 📱 متجاوب مع جميع الأجهزة
- 🌙 دعم الوضع المظلم (قريباً)
- 📧 نموذج تواصل تفاعلي

## التقنيات المستخدمة

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS
- **Database**: Supabase
- **Deployment**: Vercel (موصى به)

## التثبيت والإعداد

### 1. استنساخ المشروع

```bash
git clone <repository-url>
cd website
```

### 2. تثبيت التبعيات

```bash
npm install
```

### 3. إعداد Supabase

1. أنشئ مشروع جديد على [Supabase](https://supabase.com)
2. احصل على URL المشروع ومفتاح API
3. أنشئ ملف `.env.local` في مجلد المشروع:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

### 4. تشغيل المشروع

```bash
npm run dev
```

سيتم تشغيل المشروع على `http://localhost:3000`

## هيكل المشروع

```
website/
├── src/
│   ├── app/
│   │   ├── page.tsx          # الصفحة الرئيسية
│   │   ├── about/
│   │   │   └── page.tsx      # صفحة عني
│   │   ├── projects/
│   │   │   └── page.tsx      # صفحة المشاريع
│   │   └── contact/
│   │       └── page.tsx      # صفحة التواصل
│   ├── components/
│   │   ├── Navigation.tsx    # شريط التنقل
│   │   ├── Hero.tsx          # قسم البطل
│   │   ├── Skills.tsx        # قسم المهارات
│   │   ├── Projects.tsx      # قسم المشاريع
│   │   └── Footer.tsx        # التذييل
│   └── utils/
│       └── supabase.ts       # إعداد Supabase
├── public/                   # الصور والملفات الثابتة
└── .env.local               # متغيرات البيئة
```

## التخصيص

### تعديل المعلومات الشخصية

1. **الاسم والوصف**: عدل `src/components/Hero.tsx`
2. **المهارات**: عدل `src/components/Skills.tsx`
3. **المشاريع**: عدل `src/components/Projects.tsx` و `src/app/projects/page.tsx`
4. **معلومات التواصل**: عدل `src/app/contact/page.tsx`

### إضافة صور

1. ضع صورك في مجلد `public/`
2. حدث مسارات الصور في المكونات المناسبة

## النشر

### على Vercel (موصى به)

1. ارفع المشروع إلى GitHub
2. اربط المشروع بـ Vercel
3. أضف متغيرات البيئة في إعدادات Vercel
4. انشر المشروع

### على منصات أخرى

يمكن نشر المشروع على أي منصة تدعم Next.js مثل:
- Netlify
- Railway
- DigitalOcean App Platform

## المساهمة

نرحب بالمساهمات! يرجى:

1. Fork المشروع
2. أنشئ فرع للمميزة الجديدة
3. Commit التغييرات
4. Push إلى الفرع
5. أنشئ Pull Request

## الترخيص

هذا المشروع مرخص تحت رخصة MIT.

## الدعم

إذا كان لديك أي أسئلة أو مشاكل، يرجى فتح issue في المشروع.

---

تم التطوير بـ ❤️ بواسطة حسين
