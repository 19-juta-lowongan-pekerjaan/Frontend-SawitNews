import { defineStore } from 'pinia'

export const useUiStore = defineStore('ui', {
  state: () => ({
    isLoading: false,
    notification: null, // { message: string, type: 'success' | 'error' | 'info' | 'warning' }
    sidebarOpen: false,
    theme: localStorage.getItem('theme') || 'light',
    lang: ['id', 'en'].includes(localStorage.getItem('lang')) ? localStorage.getItem('lang') : 'id'
  }),
  actions: {
    showNotification(message, type = 'info') {
      this.notification = { message, type }
      setTimeout(() => {
        if (this.notification?.message === message) {
          this.notification = null
        }
      }, 3000)
    },
    clearNotification() {
      this.notification = null
    },
    toggleSidebar() {
      this.sidebarOpen = !this.sidebarOpen
    },
    setSidebar(val) {
      this.sidebarOpen = val
    },
    toggleTheme() {
      this.theme = this.theme === 'light' ? 'dark' : 'light'
      localStorage.setItem('theme', this.theme)
      document.documentElement.classList.toggle('dark', this.theme === 'dark')
    },
    initTheme() {
      document.documentElement.classList.toggle('dark', this.theme === 'dark')
    },
    toggleLang() {
      this.lang = this.lang === 'id' ? 'en' : 'id'
      localStorage.setItem('lang', this.lang)
    },
    t(key) {
      const translations = {
        id: {
          menu: 'Menu',
          home: 'Home',
          news: 'Berita',
          leaderboard: 'Leaderboard',
          about: 'Tentang',
          latest_news: 'Kabar Sawit Terbaru',
          see_all: 'Lihat Semua',
          trending_today: 'Trending Hari Ini',
          write_article: 'Tulis Artikel Baru',
          login: 'Masuk',
          register: 'Daftar',
          logout: 'Logout',
          profile: 'Profil Saya',
          write_nav: 'Tulis Artikel',
          my_articles: 'Artikel Saya',
          rank_progress: 'Rank Progress',
          subscription: 'Subscription',
          admin_panel: 'Admin Panel',
          logged_in_as: 'Masuk sebagai',
          write_new_article_tooltip: 'Tulis Artikel Baru',
          profile_short: 'Profil',
          write_short: 'Tulis',
          my_articles_short: 'Artikelku',
          admin_short: 'Admin',
          rank_short: 'Rank',
          settings: 'Pengaturan',
          theme: 'Tema',
          close_menu: 'Tutup Menu',

          // Article List Page
          article_list_title: 'Daftar Berita Kelapa Sawit',
          article_list_subtitle: 'Jelajahi seluruh arsip informasi dan berita kelapa sawit terupdate',
          
          // Create Article Page
          create_article_title: 'Tulis Artikel Sawit Baru',
          create_article_subtitle: 'Bagikan berita, opini, riset lapangan, atau update pasar kelapa sawit Anda kepada komunitas',
          
          // My Articles Page
          my_articles_title: 'Karya Artikel Saya',
          my_articles_subtitle: 'Kelola draf, artikel terbit, antrean verifikasi, dan pantau status tulisan Anda',
          tab_all: 'Semua Artikel',
          tab_published: 'Telah Terbit',
          tab_pending: 'Menunggu Verifikasi',
          tab_draft: 'Draf',
          tab_rejected: 'Ditolak',
          art_views: 'Views',
          art_likes: 'Likes',
          rejection_reason_prefix: 'Alasan Penolakan:',
          delete_confirm: 'Apakah Anda yakin ingin menghapus artikel ini secara permanen?',
          empty_articles: 'Tidak ada artikel di tab ini.',
          view_news: 'Lihat',
          
          // Article Sorter
          search_articles: 'Cari berita sawit...',
          all_categories: 'Semua Kategori',
          sort_latest: 'Terbaru',
          sort_trending: 'Terpopuler (Views)',
          sort_likes: 'Terbanyak Disukai',
          
          // Article List empty state
          no_articles_title: 'Tidak Ada Berita',
          no_articles_desc: 'Maaf, saat ini tidak ada berita sawit yang cocok dengan filter atau kata kunci pencarian Anda.',
          
          // Sidebar
          sidebar_title: 'Kategori Berita',
          sidebar_subtitle: 'Saring berita sawit berdasarkan topik',
          main_categories: 'Kategori Utama',
          cpo_price_title: 'Harga CPO Fisik Jambi',
          cpo_price_suffix: 'hari ini',
          
          // Profile
          contributor_profile: 'Profil Kontributor',
          profile_subtitle: 'Lihat statistik, peringkat keahlian, dan kontribusi tulisan',
          free_farmer: 'Petani Swadaya (Free)',
          active_until: 'Aktif s/d:',
          edit_profile: 'Edit Profil',
          cancel: 'Batal',
          save: 'Simpan',
          published_articles: 'Artikel yang Dipublikasikan',
          category: 'Kategori',
          no_published_articles: 'Belum mempublikasikan berita publik.',

          // Stats
          stats_articles: 'Artikel',
          stats_readers: 'Pembaca',
          stats_likes: 'Suka',

          // Login & Register Pages
          login_welcome: 'Selamat Datang',
          login_subtitle: 'Masuk ke akun SawitNews Anda untuk mulai menulis opini',
          label_email: 'Alamat Email',
          label_password: 'Password',
          remember_me: 'Ingat Saya',
          forgot_password: 'Lupa Password?',
          login_btn: 'Masuk Akun',
          demo_account_title: 'Demo Akun Uji Coba',
          no_account_yet: 'Belum punya akun?',
          register_now: 'Daftar Sekarang',
          register_welcome: 'Daftar Akun Baru',
          register_subtitle: 'Buat akun SawitNews untuk mulai membagikan berita sawit',
          label_fullname: 'Nama Lengkap',
          agree_terms: 'Saya menyetujui seluruh Syarat & Ketentuan serta Kebijakan Privasi portal SawitNews.',
          register_btn: 'Daftar Sekarang',
          already_have_account: 'Sudah punya akun?',
          login_here: 'Masuk di sini',

          // Rank Page
          rank_page_title: 'Tingkatan Pangkat & Reputasi Penulis',
          rank_page_subtitle: 'Pantau perkembangan Poin Reputasi (XP) Anda dan raih benefit kepenulisan yang lebih besar',
          rank_earn_title: 'Cara Memperoleh Poin Reputasi (XP)',
          rank_earn_subtitle: 'Reputasi dihitung berdasarkan keaktifan dan tingkat interaksi tulisan Anda pada platform SawitNews',
          rank_rule_write: 'Menulis Artikel',
          rank_rule_write_desc: 'per artikel terbit',
          rank_rule_readers: 'Jumlah Pembaca',
          rank_rule_readers_desc: 'per kali artikel dibaca',
          rank_rule_likes: 'Suka dari Pembaca',
          rank_rule_likes_desc: 'per tanda suka di artikel',
          rank_benefits_title: 'Benefit Berdasarkan Peringkat',

          // Rank
          current_rank: 'Peringkat Saat Ini',
          writer_points: 'Poin Penulis',
          next_rank_prefix: 'Ke',
          max_level: 'Level Maksimal!',
          need_xp_prefix: 'Butuh',
          need_xp_suffix: 'XP lagi untuk naik pangkat menjadi',
          rank_action_tip: 'Tulis artikel baru atau dapatkan pembaca lebih banyak!',
          max_level_congrats: 'Anda telah mencapai gelar kehormatan tertinggi di SawitNews. Terus berkarya untuk mempertahankan reputasi Anda!',

          // Badges
          achievement_badges: 'Lencana Penghargaan',
          no_badges_earned: 'Belum ada lencana yang diperoleh.',

          // Badge & Rank Names
          badge_benih: 'Benih',
          badge_tunas: 'Tunas',
          badge_pelepah: 'Pelepah',
          badge_mahkota: 'Mahkota',
          badge_raja_sawit: 'Raja Sawit',
          badge_pemula: 'Pemula',
          badge_penulis: 'Penulis',
          badge_jurnalis: 'Jurnalis',
          badge_wartawan_senior: 'Wartawan Senior',
          badge_maestro: 'Maestro',
          badge_juara_1: 'Juara 1',
          badge_juara_2: 'Juara 2',
          badge_juara_3: 'Juara 3',

          // Badge Descriptions
          badge_pemula_desc: 'Lencana awal pendaftaran anggota SawitNews.',
          badge_penulis_desc: 'Diberikan setelah mempublikasikan artikel pertama.',
          badge_jurnalis_desc: 'Diberikan setelah menerbitkan 5 artikel terverifikasi.',
          badge_wartawan_senior_desc: 'Diberikan setelah total artikel dibaca lebih dari 5,000 kali.',
          badge_maestro_desc: 'Pangkat kontributor tertinggi berkat dedikasi luar biasa.',
          badge_benih_desc: 'Peringkat awal kontributor.',
          badge_tunas_desc: 'Diberikan setelah menulis beberapa artikel.',
          badge_pelepah_desc: 'Diberikan untuk kontributor aktif.',
          badge_mahkota_desc: 'Diberikan untuk kontributor yang konsisten menulis.',
          badge_raja_sawit_desc: 'Peringkat kontributor tertinggi.',
          badge_default_desc: 'Lencana kontributor SawitNews.',

          // Leaderboard
          leaderboard_title: 'Leaderboard Kontributor Sawit',
          leaderboard_subtitle: 'Peringkat penulis teraktif yang berkontribusi membagikan wawasan kelapa sawit terbaik',
          view_my_rank: 'Lihat Rank Saya',
          search_contributor: 'Cari kontributor...',
          sort_by: 'Urutkan:',
          reputation_points: 'Poin Reputasi',
          total_articles: 'Total Artikel',
          total_readers: 'Total Pembaca',
          total_likes: 'Total Suka',
          table_rank: 'Peringkat',
          table_contributor: 'Kontributor',
          table_badge: 'Pangkat',
          table_articles: 'Artikel',
          table_readers: 'Pembaca',
          table_likes: 'Suka',
          table_reputation: 'Reputasi',
          showing_contributors_prefix: 'Menampilkan',
          showing_contributors_suffix: 'kontributor',
          prev: 'Sebelumnya',
          next: 'Selanjutnya',

          // Footer
          footer_desc: 'Portal berita independen kelapa sawit terdepan di Indonesia. Menyajikan berita agronomi, regulasi industri, teknologi terkini, dan analisis harga CPO terpercaya.',
          footer_nav: 'Navigasi',
          footer_policy: 'Kebijakan',
          footer_terms: 'Syarat & Ketentuan',
          footer_privacy: 'Kebijakan Privasi',
          footer_community: 'Panduan Komunitas',
          footer_subscribe: 'Berlangganan',
          footer_about: 'Tentang Kami',
          footer_copyright: 'Hak Cipta Dilindungi.',
          
          // Article Detail
          article_not_found: 'Berita Tidak Ditemukan',
          article_not_found_desc: 'Maaf, tautan berita sawit yang Anda tuju mungkin salah atau artikel telah dihapus oleh moderator.',
          back_to_home: 'Kembali ke Beranda',
          back_btn: 'Kembali',
          minutes_read: 'Menit Baca',
          anonymous: 'Anonim',
          readers_count: 'pembaca',
          like: 'Suka',
          share_news: 'Bagikan Berita',
          related_news: 'Berita Terkait',
          liked_notification: 'Anda menyukai berita ini!',
          link_copied_notification: 'Link berita berhasil disalin ke clipboard!',
          copy_failed_notification: 'Gagal menyalin link.',

          // Comments & Forms
          palm_discussion: 'Diskusi Sawit',
          comment_rules: 'Silakan ikuti aturan berkomentar',
          reply_btn: 'Balas',
          delete_btn: 'Hapus',
          cancel_btn: 'Batal',
          reply_placeholder: 'Balas komentar...',
          no_comments_yet: 'Belum ada diskusi untuk berita ini. Jadilah yang pertama memberikan opini!',
          comment_placeholder: 'Tulis opini atau pertanyaan Anda mengenai berita sawit ini...',
          submit_opinion: 'Kirim Opini',
          login_required_comment: 'Anda harus masuk terlebih dahulu untuk ikut berdiskusi dan memberikan komentar.',
          login_now: 'Masuk Sekarang',
          register_account: 'Daftar Akun',

          // About Page
          about_hero_tag: 'Tentang Kami',
          about_hero_title: 'Portal Berita & Opini Bebas Kelapa Sawit',
          about_hero_desc: 'SawitNews adalah website berita independen kelapa sawit tempat semua orang bebas bertukar wawasan, menganalisis perkembangan industri, dan mengutarakan opini secara merdeka.',
          about_vision_title: 'Visi Kami',
          about_vision_desc: 'Menjadi wadah berita terpercaya di mana pelaku industri, petani, dan masyarakat umum dapat bertukar pendapat secara objektif demi kemajuan industri kelapa sawit.',
          about_mission_title: 'Misi Kami',
          about_mission_desc: 'Menyajikan berita kelapa sawit yang aktual dan transparan, sekaligus menyediakan ruang diskusi terbuka yang merdeka bagi pembaca untuk menyuarakan analisis dan pandangannya.',
          about_pillars_title: 'Pilar Utama Layanan Kami',
          about_pillar1_title: 'Jurnalisme Independen',
          about_pillar1_desc: 'Menyajikan berita berimbang tanpa bias, bersandar pada fakta lapangan dan regulasi berwawasan lingkungan.',
          about_pillar2_title: 'Reputasi Penulis',
          about_pillar2_desc: 'Menghargai setiap opini dan riset kontributor dengan skema peringkat gamifikasi terintegrasi.',
          about_pillar3_title: 'Data Pasar CPO',
          about_pillar3_desc: 'Menyediakan data pergerakan pasar CPO yang kredibel untuk membantu pelaku usaha mengambil keputusan logistik.',
          about_developers_title: 'Tim Pengembang',

          // Subscription
          subscription_title: 'Pilih Paket Berlangganan',
          subscription_subtitle: 'Dapatkan berita eksklusif mendalam mengenai industri kelapa sawit, update harga CPO, dan hilangkan iklan untuk pengalaman membaca terbaik.',
          sub_status_active: 'Status Langganan Aktif',
          sub_expires_at: 'Masa aktif berakhir pada:',
          sub_cancel_btn: 'Batalkan Langganan',
          sub_writer_plans: 'Paket Langganan Penulis (IDR/Bulan, Dibayar via MoonPay)',
          sub_booster_plans: 'Booster Sekali Bayar (One-Time, Tidak Berlangganan)',
          sub_reader_plans: 'Paket untuk Pembaca / Organisasi (Tunggal & Akses Premium)',
          sub_compare_title: 'Tabel Perbandingan Fitur Paket Utama',
          sub_history_title: 'Riwayat Transaksi Pembayaran',
          sub_history_desc: 'Daftar transaksi paket berlangganan Anda',
          sub_no_history: 'Belum ada transaksi pembayaran.',
          sub_cancel_confirm: 'Apakah Anda yakin ingin membatalkan paket berlangganan aktif Anda? Manfaat premium Anda akan segera dinonaktifkan.',
          
          // Subscription Cards & Table
          sub_plan_active: 'Paket Aktif Anda',
          sub_feature_articles: 'Submit Artikel / Minggu',
          sub_feature_xp: 'Poin Reputasi Bulanan',
          sub_feature_boost: 'Reputasi Boost',
          sub_feature_adfree: 'Akses Arsip & Ad-free',
          sub_unlimited: 'Tanpa Batas',
          sub_no_boost: 'Tidak ada',
          sub_articles_unit: 'Artikel',
          sub_th_feature: 'Fitur Utama',
          sub_th_tx_id: 'ID Transaksi',
          sub_th_plan: 'Paket / Booster',
          sub_th_method: 'Metode',
          sub_th_date: 'Tanggal',
          sub_th_amount: 'Nominal',
          sub_th_status: 'Status',
          
          // Checkout
          checkout_title: 'Checkout Pembayaran',
          checkout_plan_summary: 'Paket Pilihan',
          checkout_select_method: 'Pilih Metode Pembayaran',
          checkout_qris_desc: 'Scan kode QRIS di atas dengan aplikasi dompet digital Anda (Gopay, OVO, Dana, LinkAja)',
          checkout_cancel: 'Batalkan',
          checkout_pay: 'Bayar Sekarang',

          // Subscriptions & Plans
          plan_free: 'Gratis',
          plan_starter: 'Starter',
          plan_premium: 'Premium',
          plan_pro: 'Pro',
          plan_reader_pro: 'Pembaca Pro',
          plan_corporate: 'Korporat',
          plan_boost_article: 'Boost Artikel',
          plan_fast_review: 'Fast Review',
          plan_instant_points: 'Poin Instan',
          plan_point_bundle: 'Poin Bundel',

          // Admin Dashboard
          admin_dashboard_title: 'Dashboard Admin',
          admin_dashboard_desc: 'Pantau statistik portal, verifikasi antrean karya penulis, kelola artikel dan reputasi kontributor',
          admin_total_readers: 'Total Pembaca',
          admin_total_articles: 'Total Artikel',
          admin_total_views: 'Total Views',
          admin_revenue: 'Pendapatan',
          admin_tab_queue: 'Antrean Verifikasi',
          admin_tab_articles: 'Kelola Artikel',
          admin_tab_users: 'Kelola Pengguna',

          // Article Form
          form_article_title: 'Judul Artikel',
          form_article_title_placeholder: 'Masukkan judul artikel yang menarik...',
          form_article_category: 'Kategori',
          form_article_category_placeholder: 'Pilih Kategori',
          form_article_new_category: '+ Buat Kategori Baru...',
          form_article_new_category_label: 'Nama Kategori Baru',
          form_article_new_category_placeholder: 'Masukkan nama kategori baru (misal: Bioenergi)...',
          form_article_new_category_add: 'Tambah',
          form_article_new_category_cancel: 'Batal',
          form_article_image: 'Gambar Utama (Upload Lokal)',
          form_article_image_desc: 'Pilih file gambar dari komputer Anda',
          form_article_image_hint: 'PNG, JPG, JPEG (Maks. 5MB)',
          form_article_summary: 'Ringkasan Singkat',
          form_article_summary_placeholder: 'Berikan ringkasan isi artikel dalam 2-3 kalimat...',
          form_article_content: 'Isi Artikel',
          form_article_anonymous: 'Tulis secara Anonim',
          form_article_anonymous_desc: 'Nama Anda tidak akan ditampilkan di artikel publik',
          form_article_save_draft: 'Simpan sebagai Draft',
          form_article_submit: 'Kirim Artikel',
          trending_today_desc: 'Artikel dengan interaksi dan pembaca terbanyak',
        },
        en: {
          menu: 'Menu',
          home: 'Home',
          news: 'News',
          leaderboard: 'Leaderboard',
          about: 'About',
          latest_news: 'Latest Sawit News',
          see_all: 'See All',
          trending_today: 'Trending Today',
          write_article: 'Write New Article',
          login: 'Login',
          register: 'Register',
          logout: 'Logout',
          profile: 'My Profile',
          write_nav: 'Write Article',
          my_articles: 'My Articles',
          rank_progress: 'Rank Progress',
          subscription: 'Subscription',
          admin_panel: 'Admin Panel',
          logged_in_as: 'Logged in as',
          write_new_article_tooltip: 'Write New Article',
          profile_short: 'Profile',
          write_short: 'Write',
          my_articles_short: 'My Articles',
          admin_short: 'Admin',
          rank_short: 'Rank',
          settings: 'Settings',
          theme: 'Theme',
          close_menu: 'Close Menu',

          // Article List Page
          article_list_title: 'Sawit News List',
          article_list_subtitle: 'Explore the complete archive of updated sawit news and information',
          
          // Create Article Page
          create_article_title: 'Write New Sawit Article',
          create_article_subtitle: 'Share your news, opinions, field research, or sawit market updates with the community',
          
          // My Articles Page
          my_articles_title: 'My Written Articles',
          my_articles_subtitle: 'Manage drafts, published articles, verification queue, and monitor your writing status',
          tab_all: 'All Articles',
          tab_published: 'Published',
          tab_pending: 'Pending Verification',
          tab_draft: 'Draft',
          tab_rejected: 'Rejected',
          art_views: 'Views',
          art_likes: 'Likes',
          rejection_reason_prefix: 'Rejection Reason:',
          delete_confirm: 'Are you sure you want to permanently delete this article?',
          empty_articles: 'No articles in this tab.',
          view_news: 'View',
          
          // Article Sorter
          search_articles: 'Search sawit news...',
          all_categories: 'All Categories',
          sort_latest: 'Latest',
          sort_trending: 'Trending (Views)',
          sort_likes: 'Most Liked',
          
          // Article List empty state
          no_articles_title: 'No News Found',
          no_articles_desc: 'Sorry, there are currently no sawit news matching your filter or search keywords.',
          
          // Sidebar
          sidebar_title: 'News Categories',
          sidebar_subtitle: 'Filter sawit news by topic',
          main_categories: 'Main Categories',
          cpo_price_title: 'Jambi Physical CPO Price',
          cpo_price_suffix: 'today',
          
          // Profile
          contributor_profile: 'Contributor Profile',
          profile_subtitle: 'View stats, expertise rank, and writing contributions',
          free_farmer: 'Self-sufficient Farmer (Free)',
          active_until: 'Active until:',
          edit_profile: 'Edit Profile',
          cancel: 'Cancel',
          save: 'Save',
          published_articles: 'Published Articles',
          category: 'Category',
          no_published_articles: 'Has not published any public articles yet.',

          // Stats
          stats_articles: 'Articles',
          stats_readers: 'Readers',
          stats_likes: 'Likes',

          // Login & Register Pages
          login_welcome: 'Welcome Back',
          login_subtitle: 'Log in to your SawitNews account to start writing opinions',
          label_email: 'Email Address',
          label_password: 'Password',
          remember_me: 'Remember Me',
          forgot_password: 'Forgot Password?',
          login_btn: 'Log In',
          demo_account_title: 'Demo Test Account',
          no_account_yet: 'Don\'t have an account?',
          register_now: 'Register Now',
          register_welcome: 'Register New Account',
          register_subtitle: 'Create a SawitNews account to start sharing sawit news',
          label_fullname: 'Full Name',
          agree_terms: 'I agree to all Terms & Conditions and Privacy Policy of the SawitNews portal.',
          register_btn: 'Register Now',
          already_have_account: 'Already have an account?',
          login_here: 'Log in here',

          // Rank Page
          rank_page_title: 'Author Rank Levels & Reputation',
          rank_page_subtitle: 'Monitor your Reputation Points (XP) progress and achieve greater writing benefits',
          rank_earn_title: 'How to Earn Reputation Points (XP)',
          rank_earn_subtitle: 'Reputation is calculated based on your activity and article engagement on SawitNews',
          rank_rule_write: 'Write Articles',
          rank_rule_write_desc: 'per published article',
          rank_rule_readers: 'Total Readers',
          rank_rule_readers_desc: 'per article view',
          rank_rule_likes: 'Likes from Readers',
          rank_rule_likes_desc: 'per like on article',
          rank_benefits_title: 'Benefits by Rank Tier',

          // Rank
          current_rank: 'Current Rank',
          writer_points: 'Writer Points',
          next_rank_prefix: 'To',
          max_level: 'Maximum Level!',
          need_xp_prefix: 'Needs',
          need_xp_suffix: 'more XP to level up to',
          rank_action_tip: 'Publish new articles or get more readers!',
          max_level_congrats: 'You have achieved the highest honorary title in SawitNews. Keep writing to maintain your reputation!',

          // Badges
          achievement_badges: 'Achievement Badges',
          no_badges_earned: 'No achievement badges earned yet.',

          // Badge & Rank Names
          badge_benih: 'Seed',
          badge_tunas: 'Sprout',
          badge_pelepah: 'Frond',
          badge_mahkota: 'Crown',
          badge_raja_sawit: 'Sawit King',
          badge_pemula: 'Beginner',
          badge_penulis: 'Writer',
          badge_jurnalis: 'Journalist',
          badge_wartawan_senior: 'Senior Journalist',
          badge_maestro: 'Maestro',
          badge_juara_1: '1st Place',
          badge_juara_2: '2nd Place',
          badge_juara_3: '3rd Place',

          // Badge Descriptions
          badge_pemula_desc: 'Starting badge for registered members of SawitNews.',
          badge_penulis_desc: 'Awarded after publishing the first article.',
          badge_jurnalis_desc: 'Awarded after publishing 5 verified articles.',
          badge_wartawan_senior_desc: 'Awarded after total article views exceed 5,000.',
          badge_maestro_desc: 'Highest contributor rank for outstanding dedication.',
          badge_benih_desc: 'Starting rank of contributor.',
          badge_tunas_desc: 'Awarded after writing some articles.',
          badge_pelepah_desc: 'Awarded to active contributors.',
          badge_mahkota_desc: 'Awarded to contributors with consistent writing.',
          badge_raja_sawit_desc: 'Highest contributor rank.',
          badge_default_desc: 'SawitNews contributor badge.',

          // Leaderboard
          leaderboard_title: 'Sawit Contributor Leaderboard',
          leaderboard_subtitle: 'Rankings of active writers who contribute by sharing the best sawit insights',
          view_my_rank: 'View My Rank',
          search_contributor: 'Search contributor...',
          sort_by: 'Sort by:',
          reputation_points: 'Reputation Points',
          total_articles: 'Total Articles',
          total_readers: 'Total Readers',
          total_likes: 'Total Likes',
          table_rank: 'Rank',
          table_contributor: 'Contributor',
          table_badge: 'Rank Tier',
          table_articles: 'Articles',
          table_readers: 'Readers',
          table_likes: 'Likes',
          table_reputation: 'Reputation',
          showing_contributors_prefix: 'Showing',
          showing_contributors_suffix: 'contributors',
          prev: 'Previous',
          next: 'Next',

          // Footer
          footer_desc: 'Leading independent sawit news portal in Indonesia. Providing agronomy news, industry regulations, latest technologies, and trusted CPO price analysis.',
          footer_nav: 'Navigation',
          footer_policy: 'Policies',
          footer_terms: 'Terms & Conditions',
          footer_privacy: 'Privacy Policy',
          footer_community: 'Community Guidelines',
          footer_subscribe: 'Subscribe',
          footer_about: 'About Us',
          footer_copyright: 'All Rights Reserved.',
          
          // Article Detail
          article_not_found: 'Article Not Found',
          article_not_found_desc: 'Sorry, the sawit news link you entered might be incorrect or the article has been deleted by a moderator.',
          back_to_home: 'Back to Home',
          back_btn: 'Back',
          minutes_read: 'Min Read',
          anonymous: 'Anonymous',
          readers_count: 'readers',
          like: 'Like',
          share_news: 'Share Article',
          related_news: 'Related News',
          liked_notification: 'You liked this article!',
          link_copied_notification: 'Article link successfully copied to clipboard!',
          copy_failed_notification: 'Failed to copy link.',

          // Comments & Forms
          palm_discussion: 'Sawit Discussion',
          comment_rules: 'Please follow the commenting rules',
          reply_btn: 'Reply',
          delete_btn: 'Delete',
          cancel_btn: 'Cancel',
          reply_placeholder: 'Reply to comment...',
          no_comments_yet: 'No discussion on this article yet. Be the first to share your opinion!',
          comment_placeholder: 'Write your opinion or question about this sawit news...',
          submit_opinion: 'Submit Opinion',
          login_required_comment: 'You must log in first to join the discussion and post comments.',
          login_now: 'Log In Now',
          register_account: 'Register Account',

          // About Page
          about_hero_tag: 'About Us',
          about_hero_title: 'Independent Palm Oil News & Open Discussion Portal',
          about_hero_desc: 'SawitNews is an independent palm oil news website where everyone is free to exchange insights, analyze industry developments, and voice opinions openly.',
          about_vision_title: 'Our Vision',
          about_vision_desc: 'To be a trusted news platform where industry players, farmers, and the public can objectively exchange opinions for the progress of the palm oil industry.',
          about_mission_title: 'Our Mission',
          about_mission_desc: 'To provide actual and transparent palm oil news, while offering a free open discussion space for readers to share their analysis and views.',
          about_pillars_title: 'Core Pillars of Our Services',
          about_pillar1_title: 'Independent Journalism',
          about_pillar1_desc: 'Providing balanced news without bias, relying on field facts and environmentally conscious regulations.',
          about_pillar2_title: 'Author Reputation',
          about_pillar2_desc: 'Appreciating every contributor\'s opinion and research with an integrated gamified ranking scheme.',
          about_pillar3_title: 'CPO Market Data',
          about_pillar3_desc: 'Providing credible CPO market movement data to help business players make logistical decisions.',
          about_developers_title: 'Our Developers',

          // Subscription
          subscription_title: 'Choose Subscription Plan',
          subscription_subtitle: 'Get in-depth exclusive news about the sawit industry, CPO price updates, and remove ads for the best reading experience.',
          sub_status_active: 'Active Subscription Status',
          sub_expires_at: 'Expiry date:',
          sub_cancel_btn: 'Cancel Subscription',
          sub_writer_plans: 'Writer Subscription Plans (IDR/Month, Paid via MoonPay)',
          sub_booster_plans: 'One-Time Boosters (Non-Recurring)',
          sub_reader_plans: 'Plans for Readers / Organizations (Single & Premium Access)',
          sub_compare_title: 'Main Plan Feature Comparison Table',
          sub_history_title: 'Payment Transaction History',
          sub_history_desc: 'List of your subscription package transactions',
          sub_no_history: 'No payment transactions yet.',
          sub_cancel_confirm: 'Are you sure you want to cancel your active subscription? Your premium benefits will be disabled immediately.',
          
          // Subscription Cards & Table
          sub_plan_active: 'Your Active Plan',
          sub_feature_articles: 'Submit Articles / Week',
          sub_feature_xp: 'Monthly Reputation Points',
          sub_feature_boost: 'Reputation Boost',
          sub_feature_adfree: 'Archive Access & Ad-free',
          sub_unlimited: 'Unlimited',
          sub_no_boost: 'None',
          sub_articles_unit: 'Articles',
          sub_th_feature: 'Core Feature',
          sub_th_tx_id: 'Transaction ID',
          sub_th_plan: 'Plan / Booster',
          sub_th_method: 'Method',
          sub_th_date: 'Date',
          sub_th_amount: 'Amount',
          sub_th_status: 'Status',
          
          // Checkout
          checkout_title: 'Payment Checkout',
          checkout_plan_summary: 'Selected Plan',
          checkout_select_method: 'Choose Payment Method',
          checkout_qris_desc: 'Scan the QRIS code above with your digital wallet app (Gopay, OVO, Dana, LinkAja)',
          checkout_cancel: 'Cancel',
          checkout_pay: 'Pay Now',

          // Subscriptions & Plans
          plan_free: 'Free',
          plan_starter: 'Starter',
          plan_premium: 'Premium',
          plan_pro: 'Pro',
          plan_reader_pro: 'Reader Pro',
          plan_corporate: 'Corporate',
          plan_boost_article: 'Boost Article',
          plan_fast_review: 'Fast Review',
          plan_instant_points: 'Instant Points',
          plan_point_bundle: 'Point Bundle',

          // Admin Dashboard
          admin_dashboard_title: 'Admin Dashboard',
          admin_dashboard_desc: 'Monitor portal statistics, verify writer queues, manage articles and contributor reputation',
          admin_total_readers: 'Total Readers',
          admin_total_articles: 'Total Articles',
          admin_total_views: 'Total Views',
          admin_revenue: 'Revenue',
          admin_tab_queue: 'Verification Queue',
          admin_tab_articles: 'Manage Articles',
          admin_tab_users: 'Manage Users',

          // Article Form
          form_article_title: 'Article Title',
          form_article_title_placeholder: 'Enter an engaging article title...',
          form_article_category: 'Category',
          form_article_category_placeholder: 'Select Category',
          form_article_new_category: '+ Create New Category...',
          form_article_new_category_label: 'New Category Name',
          form_article_new_category_placeholder: 'Enter new category name (e.g. Bioenergy)...',
          form_article_new_category_add: 'Add',
          form_article_new_category_cancel: 'Cancel',
          form_article_image: 'Featured Image (Local Upload)',
          form_article_image_desc: 'Select an image file from your computer',
          form_article_image_hint: 'PNG, JPG, JPEG (Max. 5MB)',
          form_article_summary: 'Short Summary',
          form_article_summary_placeholder: 'Provide a summary of the article in 2-3 sentences...',
          form_article_content: 'Article Content',
          form_article_anonymous: 'Write Anonymously',
          form_article_anonymous_desc: 'Your name will not be displayed on the public article',
          form_article_save_draft: 'Save as Draft',
          form_article_submit: 'Submit Article',
          trending_today_desc: 'Articles with the most interaction and readers',
        },
      }
      const val = translations[this.lang]?.[key]
      if (val !== undefined && val !== null) {
        return val
      }
      
      // Fallback formatter: if the key contains underscores, hyphens, or camelCase, format as Start Case
      if (typeof key === 'string' && (key.includes('_') || key.includes('-') || /^[a-z]+[A-Z]/.test(key))) {
        const words = key
          .replace(/([a-z])([A-Z])/g, '$1 $2')
          .replace(/[_-]/g, ' ')
          .split(/\s+/)
        return words
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ')
      }
      return key
    }
  }
})
