<?php

namespace App\Filament\Resources;

use App\Filament\Resources\ArticleResource\Pages;
use App\Filament\Resources\ArticleResource\RelationManagers;
use App\Models\Article;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

use Illuminate\Support\Str;

class ArticleResource extends Resource
{
    protected static ?string $model = Article::class;

    protected static ?string $navigationIcon = 'heroicon-o-document-text';
    protected static ?string $navigationLabel = 'المقالات';
    protected static ?string $modelLabel = 'مقال';
    protected static ?string $pluralModelLabel = 'المقالات';
    protected static ?int $navigationSort = 1;

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Tabs::make('ArticleTabs')
                    ->tabs([
                        // Tab 1: Basic Information
                        Forms\Components\Tabs\Tab::make('المعلومات الأساسية')
                            ->icon('heroicon-o-information-circle')
                            ->schema([
                                Forms\Components\TextInput::make('title')
                                    ->label('عنوان المقال الرئيسي')
                                    ->required()
                                    ->maxLength(255)
                                    ->live(onBlur: true)
                                    ->afterStateUpdated(function (string $operation, $state, Forms\Set $set, Forms\Get $get) {
                                        if ($operation === 'create' && blank($get('slug'))) {
                                            $set('slug', Str::slug($state, '-', null));
                                        }
                                    }),

                                Forms\Components\TextInput::make('slug')
                                    ->label('الرابط المخصص (Slug)')
                                    ->required()
                                    ->maxLength(255)
                                    ->unique(Article::class, 'slug', ignoreRecord: true)
                                    ->helperText('يستخدم في رابط الصفحة، يدعم الأحرف الإنجليزية أو الكلمات العربية المفصولة بشرطة.'),

                                Forms\Components\TextInput::make('category')
                                    ->label('التصنيف')
                                    ->default('معلومات عن تنسيق الحدائق')
                                    ->maxLength(255),

                                Forms\Components\TextInput::make('pill_text')
                                    ->label('نص الشارة على الصورة (Badge)')
                                    ->default('معلومات تهمك')
                                    ->maxLength(255),

                                Forms\Components\TextInput::make('read_time')
                                    ->label('وقت القراءة المقدر')
                                    ->default('8 دقائق')
                                    ->maxLength(100),

                                Forms\Components\Grid::make(2)
                                    ->schema([
                                        Forms\Components\TextInput::make('day')
                                            ->label('يوم النشر')
                                            ->default(now()->format('d'))
                                            ->maxLength(10),

                                        Forms\Components\TextInput::make('month')
                                            ->label('شهر النشر (بالعربية)')
                                            ->default('سبتمبر')
                                            ->maxLength(50),
                                    ]),

                                Forms\Components\FileUpload::make('image')
                                    ->label('الصورة البارزة للمقال')
                                    ->disk('public')
                                    ->directory('articles')
                                    ->visibility('public')
                                    ->image()
                                    ->acceptedFileTypes(['image/jpeg', 'image/png', 'image/webp'])
                                    ->maxSize(5120)
                                    ->columnSpanFull(),

                                Forms\Components\Textarea::make('excerpt')
                                    ->label('المقتطف المختصر (Excerpt)')
                                    ->rows(3)
                                    ->columnSpanFull()
                                    ->helperText('يظهر في بطاقات المقالات ونتائج البحث وموجز التواصل الاجتماعي.'),

                                Forms\Components\Textarea::make('subtitle')
                                    ->label('الملخص التنفيذي (Subtitle Box)')
                                    ->rows(2)
                                    ->columnSpanFull()
                                    ->helperText('يظهر في الصندوق الأخضر في أعلى صفحة المقال الفردي.'),

                                Forms\Components\Select::make('status')
                                    ->label('حالة النشر')
                                    ->options([
                                        'draft'     => 'مسودة (Draft)',
                                        'published' => 'منشور (Published)',
                                    ])
                                    ->default('draft')
                                    ->required()
                                    ->live()
                                    ->afterStateUpdated(function ($state, Forms\Set $set, Forms\Get $get) {
                                        if ($state === 'published' && blank($get('published_at'))) {
                                            $set('published_at', now());
                                        }
                                    }),

                                Forms\Components\DateTimePicker::make('published_at')
                                    ->label('تاريخ وتوقيت النشر')
                                    ->nullable(),
                            ])
                            ->columns(2),

                        // Tab 2: WordPress-Like Rich Article Editor
                        Forms\Components\Tabs\Tab::make('محرر المقال')
                            ->icon('heroicon-o-pencil-square')
                            ->schema([
                                Forms\Components\RichEditor::make('content')
                                    ->label('محتوى المقال (محرر ذكي شبيه بـ WordPress)')
                                    ->placeholder('اكتب محتوى المقال هنا بحرية كاملة... يمكنك إضافة عناوين H2/H3، وتنسيق النصوص، والقوائم النقطية والرقمية، والاقتباسات، ورفع الصور داخل المقال مباشرة.')
                                    ->toolbarButtons([
                                        'attachFiles',
                                        'blockquote',
                                        'bold',
                                        'bulletList',
                                        'codeBlock',
                                        'h2',
                                        'h3',
                                        'italic',
                                        'link',
                                        'orderedList',
                                        'redo',
                                        'strike',
                                        'underline',
                                        'undo',
                                    ])
                                    ->fileAttachmentsDisk('public')
                                    ->fileAttachmentsDirectory('articles/content')
                                    ->fileAttachmentsVisibility('public')
                                    ->columnSpanFull()
                                    ->helperText('يدعم الكتابة باللغة العربية RTL، السحب والإفلات للصور، والنسخ واللصق من Word ومستندات Google.'),
                            ]),

                        // Tab 3: Structured Content (Optional)
                        Forms\Components\Tabs\Tab::make('المحتوى المهيكل المتقدم (اختياري)')
                            ->icon('heroicon-o-rectangle-stack')
                            ->badge('اختياري')
                            ->badgeColor('gray')
                            ->schema([
                                Forms\Components\Section::make('فهرس الموضوعات (Table of Contents)')
                                    ->collapsed()
                                    ->schema([
                                        Forms\Components\Repeater::make('table_of_contents')
                                            ->label('عناصر الفهرس')
                                            ->schema([
                                                Forms\Components\TextInput::make('id')
                                                    ->label('معرف الرابط (Anchor ID)')
                                                    ->placeholder('landscaping-cost')
                                                    ->required(),
                                                Forms\Components\TextInput::make('title')
                                                    ->label('عنوان الموضوع')
                                                    ->placeholder('تكلفة تنسيق الحدائق بالرياض')
                                                    ->required(),
                                            ])
                                            ->columns(2)
                                            ->itemLabel(fn (array $state): ?string => $state['title'] ?? null),
                                    ]),

                                Forms\Components\Section::make('المقدمة (Introduction)')
                                    ->collapsed()
                                    ->schema([
                                        Forms\Components\Repeater::make('introduction')
                                            ->label('فقرات المقدمة')
                                            ->simple(
                                                Forms\Components\Textarea::make('item')
                                                    ->label('الفقرة')
                                                    ->rows(2)
                                                    ->required()
                                            ),
                                    ]),

                                Forms\Components\Section::make('النقاط الجوهرية (Key Takeaways)')
                                    ->collapsed()
                                    ->schema([
                                        Forms\Components\Repeater::make('key_takeaways')
                                            ->label('قائمة النقاط الرئيسية المميزة')
                                            ->simple(
                                                Forms\Components\TextInput::make('item')
                                                    ->label('نقطة جوهرية')
                                                    ->required()
                                            ),
                                    ]),

                                Forms\Components\Section::make('أقسام المقال التفصيلية (Sections)')
                                    ->schema([
                                        Forms\Components\Repeater::make('sections')
                                            ->label('الأقسام الرئيسية')
                                            ->schema([
                                                Forms\Components\TextInput::make('id')
                                                    ->label('معرّف القسم (ID)')
                                                    ->placeholder('step-1')
                                                    ->required(),

                                                Forms\Components\TextInput::make('numTitle')
                                                    ->label('عنوان القسم المرقم')
                                                    ->placeholder('1. اختيار نوع العشب المناسب')
                                                    ->required(),

                                                Forms\Components\Repeater::make('paragraphs')
                                                    ->label('فقرات القسم')
                                                    ->simple(
                                                        Forms\Components\Textarea::make('item')
                                                            ->label('نص الفقرة')
                                                            ->rows(2)
                                                    )
                                                    ->collapsible(),

                                                Forms\Components\Repeater::make('bullets')
                                                    ->label('نقاط القسم المميزة')
                                                    ->simple(
                                                        Forms\Components\TextInput::make('item')
                                                            ->label('النقطة')
                                                    )
                                                    ->collapsible(),

                                                Forms\Components\Textarea::make('highlightBox')
                                                    ->label('صندوق تمييز خاص بالقسم (اختياري)')
                                                    ->rows(2),

                                                Forms\Components\Repeater::make('subsections')
                                                    ->label('الأقسام الفرعية (Subsections)')
                                                    ->schema([
                                                        Forms\Components\TextInput::make('subtitle')
                                                            ->label('العنوان الفرعي')
                                                            ->required(),

                                                        Forms\Components\Repeater::make('paragraphs')
                                                            ->label('فقرات القسم الفرعي')
                                                            ->simple(
                                                                Forms\Components\Textarea::make('item')
                                                                    ->rows(2)
                                                            )
                                                            ->collapsible(),

                                                        Forms\Components\Repeater::make('bullets')
                                                            ->label('نقاط القسم الفرعي')
                                                            ->simple(
                                                                Forms\Components\TextInput::make('item')
                                                            )
                                                            ->collapsible(),
                                                    ])
                                                    ->collapsible()
                                                    ->itemLabel(fn (array $state): ?string => $state['subtitle'] ?? null),
                                            ])
                                            ->collapsible()
                                            ->itemLabel(fn (array $state): ?string => $state['numTitle'] ?? null),
                                    ]),

                                Forms\Components\Section::make('جدول المقارنة الفنية والأسعار (Comparison Table)')
                                    ->collapsed()
                                    ->schema([
                                        Forms\Components\TextInput::make('comparison_table.title')
                                            ->label('عنوان جدول المقارنة')
                                            ->placeholder('مقارنة بين العشب الطبيعي والصناعي'),

                                        Forms\Components\TagsInput::make('comparison_table.headers')
                                            ->label('أعمدة الجدول (Headers)')
                                            ->placeholder('أضف عنوان العمود واضغط Enter'),

                                        Forms\Components\Repeater::make('comparison_table.rows')
                                            ->label('صفوف الجدول (Rows)')
                                            ->schema([
                                                Forms\Components\TagsInput::make('0')
                                                    ->label('بيانات خلايا الصف')
                                                    ->placeholder('أضف قيمة كل خلية بنفس ترتيب الأعمدة واضغط Enter'),
                                            ]),
                                    ]),

                                Forms\Components\Section::make('التحذيرات والأخطاء الشائعة (Fatal Mistakes)')
                                    ->collapsed()
                                    ->schema([
                                        Forms\Components\Repeater::make('fatal_mistakes')
                                            ->label('قائمة الأخطاء الهندسية والتحذيرات')
                                            ->simple(
                                                Forms\Components\TextInput::make('item')
                                                    ->label('تحذير')
                                                    ->required()
                                            ),
                                    ]),

                                Forms\Components\Section::make('الأسئلة الشائعة (FAQs)')
                                    ->collapsed()
                                    ->schema([
                                        Forms\Components\Repeater::make('faqs')
                                            ->label('الأسئلة والأجوبة (تستخدم أيضاً في FAQPage Schema)')
                                            ->schema([
                                                Forms\Components\TextInput::make('question')
                                                    ->label('السؤال')
                                                    ->required(),
                                                Forms\Components\Textarea::make('answer')
                                                    ->label('الإجابة الشاملة')
                                                    ->required()
                                                    ->rows(3),
                                            ])
                                            ->collapsible()
                                            ->itemLabel(fn (array $state): ?string => $state['question'] ?? null),
                                    ]),

                                Forms\Components\Section::make('الخاتمة والتوصيات (Conclusion)')
                                    ->collapsed()
                                    ->schema([
                                        Forms\Components\Repeater::make('conclusion')
                                            ->label('فقرات الخلاصة')
                                            ->simple(
                                                Forms\Components\Textarea::make('item')
                                                    ->label('فقرة التوصية')
                                                    ->rows(2)
                                            ),
                                    ]),

                                Forms\Components\Textarea::make('summary_box')
                                    ->label('نص بانر الحجز و CTA السفلي')
                                    ->rows(3)
                                    ->helperText('النص الترويجي المعروض فوق أزرار الاتصال وحجز المعاينة المجانية في أسفل المقال.'),

                                Forms\Components\Textarea::make('full_content')
                                    ->label('المحتوى الاحتياطي الكامل (Fallback Content)')
                                    ->rows(6)
                                    ->helperText('محتوى نصي بديل اختياري.'),
                            ]),

                        // Tab 3: SEO Section
                        Forms\Components\Tabs\Tab::make('تحسين محركات البحث SEO')
                            ->icon('heroicon-o-magnifying-glass')
                            ->schema([
                                Forms\Components\TextInput::make('meta_title')
                                    ->label('عنوان الميتا المخصص (Meta Title)')
                                    ->maxLength(255)
                                    ->placeholder('اتركه فارغاً لاستخدام عنوان المقال تلقائياً'),

                                Forms\Components\Textarea::make('meta_description')
                                    ->label('وصف الميتا (Meta Description)')
                                    ->rows(3)
                                    ->placeholder('الوصف التعريفي للظهور في محركات البحث ومشاركات السوشيال ميديا'),

                                Forms\Components\TextInput::make('focus_keyword')
                                    ->label('الكلمة المفتاحية المستهدفة (Focus Keyword)')
                                    ->placeholder('تنسيق حدائق بالرياض'),

                                Forms\Components\TagsInput::make('keywords')
                                    ->label('الكلمات المفتاحية (Keywords Tags)')
                                    ->placeholder('اكتب الكلمة واضغط Enter'),

                                Forms\Components\TextInput::make('canonical_url')
                                    ->label('رابط الكانونيكال المخصص (Canonical URL)')
                                    ->placeholder('https://hadiqat-alrayan.com/blog/...'),

                                Forms\Components\TextInput::make('og_image')
                                    ->label('رابط صورة المشاركة (OpenGraph Image URL)')
                                    ->placeholder('/images/...'),
                            ])
                            ->columns(2),

                        // Tab 4: Author Section
                        Forms\Components\Tabs\Tab::make('بيانات الكاتب')
                            ->icon('heroicon-o-user')
                            ->schema([
                                Forms\Components\TextInput::make('author_name')
                                    ->label('اسم الكاتب / القسم')
                                    ->default('مؤسسة حدائق الريان')
                                    ->maxLength(255),

                                Forms\Components\TextInput::make('author_role')
                                    ->label('المسمى الوظيفي للكاتب')
                                    ->default('قسم التصميم والمشاريع السكنية')
                                    ->maxLength(255),

                                Forms\Components\TextInput::make('author_avatar')
                                    ->label('مسار صورة الكاتب')
                                    ->default('/images/rabea-shaban-profile.webp')
                                    ->maxLength(255),
                            ])
                            ->columns(3),
                    ])
                    ->columnSpanFull()
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\ImageColumn::make('image')
                    ->label('الصورة')
                    ->disk('public')
                    ->visibility('public')
                    ->circular()
                    ->defaultImageUrl('/images/garden-costs-faq-banner.webp'),

                Tables\Columns\TextColumn::make('title')
                    ->label('عنوان المقال')
                    ->searchable()
                    ->sortable()
                    ->weight('bold')
                    ->limit(45),

                Tables\Columns\TextColumn::make('category')
                    ->label('التصنيف')
                    ->badge()
                    ->searchable()
                    ->sortable(),

                Tables\Columns\TextColumn::make('status')
                    ->label('الحالة')
                    ->badge()
                    ->color(fn (string $state): string => match ($state) {
                        'published' => 'success',
                        'draft'     => 'gray',
                        default     => 'gray',
                    })
                    ->formatStateUsing(fn (string $state): string => match ($state) {
                        'published' => 'منشور',
                        'draft'     => 'مسودة',
                        default     => $state,
                    })
                    ->sortable(),

                Tables\Columns\TextColumn::make('published_at')
                    ->label('تاريخ النشر')
                    ->dateTime('Y-m-d H:i')
                    ->placeholder('لم يُنشر بعد')
                    ->sortable(),

                Tables\Columns\TextColumn::make('created_at')
                    ->label('تاريخ الإنشاء')
                    ->dateTime('Y-m-d H:i')
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->defaultSort('created_at', 'desc')
            ->filters([
                Tables\Filters\SelectFilter::make('status')
                    ->label('تصفية حسب الحالة')
                    ->options([
                        'published' => 'منشور',
                        'draft'     => 'مسودة',
                    ]),

                Tables\Filters\SelectFilter::make('category')
                    ->label('تصفية حسب التصنيف'),
            ])
            ->actions([
                Tables\Actions\Action::make('publish')
                    ->label('نشر')
                    ->icon('heroicon-o-check-circle')
                    ->color('success')
                    ->visible(fn (Article $record): bool => $record->status === 'draft')
                    ->requiresConfirmation()
                    ->action(fn (Article $record) => $record->update([
                        'status'       => 'published',
                        'published_at' => now(),
                    ])),

                Tables\Actions\Action::make('unpublish')
                    ->label('إلغاء النشر')
                    ->icon('heroicon-o-x-circle')
                    ->color('warning')
                    ->visible(fn (Article $record): bool => $record->status === 'published')
                    ->requiresConfirmation()
                    ->action(fn (Article $record) => $record->update([
                        'status'       => 'draft',
                        'published_at' => null,
                    ])),

                Tables\Actions\EditAction::make()->label('تعديل'),
                Tables\Actions\DeleteAction::make()->label('حذف'),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make()->label('حذف المحدد'),
                ]),
            ]);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListArticles::route('/'),
            'create' => Pages\CreateArticle::route('/create'),
            'edit' => Pages\EditArticle::route('/{record}/edit'),
        ];
    }
}
