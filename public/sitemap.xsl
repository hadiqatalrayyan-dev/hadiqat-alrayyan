<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0" 
                xmlns:html="http://www.w3.org/TR/REC-html40"
                xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>
  <xsl:template match="/">
    <html lang="ar" dir="rtl">
      <head>
        <title>خريطة الموقع XML | مؤسسة حدائق المستقبل بالرياض</title>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <style type="text/css">
          body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
            color: #333;
            background-color: #f8fafc;
            margin: 0;
            padding: 40px 20px;
          }
          .container {
            max-width: 1000px;
            margin: 0 auto;
            background: #ffffff;
            border-radius: 16px;
            padding: 30px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.06);
            border: 1px solid #e2e8f0;
          }
          .header {
            border-bottom: 2px solid #edf7ea;
            padding-bottom: 20px;
            margin-bottom: 25px;
            display: flex;
            align-items: center;
            justify-content: space-between;
          }
          h1 {
            color: #064e3b;
            font-size: 22px;
            margin: 0 0 8px 0;
          }
          p.subtitle {
            color: #64748b;
            font-size: 13px;
            margin: 0;
          }
          .badge {
            background: #edf7ea;
            color: #4d8834;
            font-weight: bold;
            padding: 6px 14px;
            border-radius: 20px;
            font-size: 13px;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 10px;
          }
          th {
            background-color: #064e3b;
            color: #ffffff;
            text-align: right;
            padding: 12px 16px;
            font-size: 13px;
            font-weight: 600;
          }
          th:first-child {
            border-top-right-radius: 8px;
          }
          th:last-child {
            border-top-left-radius: 8px;
            text-align: center;
          }
          tr {
            border-bottom: 1px solid #f1f5f9;
            transition: background-color 0.2s;
          }
          tr:hover {
            background-color: #f8fafc;
          }
          td {
            padding: 12px 16px;
            font-size: 13px;
            color: #334155;
          }
          td a {
            color: #4d8834;
            text-decoration: none;
            font-weight: 500;
            word-break: break-all;
          }
          td a:hover {
            text-decoration: underline;
          }
          .priority-tag {
            background: #f1f5f9;
            color: #475569;
            padding: 3px 8px;
            border-radius: 6px;
            font-size: 12px;
            font-weight: bold;
            display: inline-block;
          }
          .footer {
            margin-top: 25px;
            text-align: center;
            font-size: 12px;
            color: #94a3b8;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div>
              <h1>خريطة الموقع الرسمية (XML Sitemap)</h1>
              <p class="subtitle">مؤسسة حدائق المستقبل لتنسيق وتصميم الحدائق بالرياض</p>
            </div>
            <div class="badge">
              إجمالي الروابط: <xsl:value-of select="count(sitemap:urlset/sitemap:url)"/>
            </div>
          </div>
          
          <table>
            <thead>
              <tr>
                <th width="60%">رابط الصفحة (URL)</th>
                <th width="15%">الأولوية</th>
                <th width="15%">التحديث</th>
                <th width="10%" style="text-align: center;">تاريخ التعديل</th>
              </tr>
            </thead>
            <tbody>
              <xsl:for-each select="sitemap:urlset/sitemap:url">
                <tr>
                  <td>
                    <a href="{sitemap:loc}" target="_blank">
                      <xsl:value-of select="sitemap:loc"/>
                    </a>
                  </td>
                  <td>
                    <span class="priority-tag">
                      <xsl:value-of select="sitemap:priority"/>
                    </span>
                  </td>
                  <td>
                    <xsl:value-of select="sitemap:changefreq"/>
                  </td>
                  <td style="text-align: center; color: #64748b; font-size: 12px;">
                    <xsl:value-of select="sitemap:lastmod"/>
                  </td>
                </tr>
              </xsl:for-each>
            </tbody>
          </table>
          
          <div class="footer">
            تم إنشاء وتوليد هذه الخريطة آلياً للتوافق مع معايير محركات البحث العالمية Google Search Console
          </div>
        </div>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
