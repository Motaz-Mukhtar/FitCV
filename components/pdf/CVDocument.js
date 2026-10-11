import { Document, Page, Text, View, StyleSheet, Link } from '@react-pdf/renderer';

// ATS-Optimized Color Palette (minimal, professional)
const colors = {
  black:     '#000000',
  darkGray:  '#333333',
  gray:      '#666666',
  lightGray: '#999999',
  white:     '#FFFFFF',
  divider:   '#CCCCCC',
};

// ATS-Friendly Styles (clean, simple, no decorative elements)
const styles = StyleSheet.create({
  page: {
    paddingTop:        40,
    paddingBottom:     40,
    paddingHorizontal: 50,
    fontFamily:        'Helvetica',
    fontSize:          10,
    color:             colors.black,
    backgroundColor:   colors.white,
    lineHeight:        1.4,
  },

  // ── HEADER (Name + Contact) ──────────────────────────────
  name: {
    fontSize:      22,
    fontFamily:    'Helvetica-Bold',
    color:         colors.black,
    textAlign:     'center',
    marginBottom:  8,
    letterSpacing: 0.5,
  },
  location: {
    fontSize:     10,
    color:        colors.darkGray,
    textAlign:    'center',
    marginBottom: 8,
  },
  contactRow: {
    flexDirection:  'row',
    justifyContent: 'center',
    alignItems:     'center',
    gap:            4,
    marginBottom:   8,
    flexWrap:       'wrap',
  },
  contactText: {
    fontSize: 9,
    color:    colors.gray,
  },
  contactDivider: {
    fontSize: 9,
    color:    colors.lightGray,
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: colors.divider,
    marginTop:         2,
    marginBottom:      8,
  },

  // ── SECTION HEADERS (ATS-Recognized) ─────────────────────
  sectionTitle: {
    fontSize:      11,
    fontFamily:    'Helvetica-Bold',
    color:         colors.black,
    marginBottom:  3,
    marginTop:     10,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },

  // ── PROFILE SUMMARY ──────────────────────────────────────
  bulletItem: {
    flexDirection: 'row',
    marginBottom:  3,
    alignItems:    'flex-start',
  },
  bulletSymbol: {
    fontSize:   10,
    color:      colors.black,
    marginRight: 6,
    width:      10,
  },
  bulletText: {
    flex:       1,
    fontSize:   10,
    color:      colors.darkGray,
    lineHeight: 1.4,
  },

  // ── COURSEWORK / SKILLS (Two-Column) ─────────────────────
  twoColumnRow: {
    flexDirection: 'row',
    flexWrap:      'wrap',
    gap:           2,
    marginBottom:  6,
  },
  courseItem: {
    flexDirection: 'row',
    alignItems:    'center',
    marginRight:   12,
    marginBottom:  2,
  },
  courseBullet: {
    fontSize:    10,
    color:       colors.black,
    marginRight: 5,
  },
  courseText: {
    fontSize: 10,
    color:    colors.darkGray,
  },

  // ── EXPERIENCE ───────────────────────────────────────────
  jobBlock: {
    marginBottom: 8,
  },
  jobHeader: {
    flexDirection:  'row',
    justifyContent: 'space-between',
    alignItems:     'baseline',
    marginBottom:   2,
  },
  jobTitle: {
    fontSize:   10.5,
    fontFamily: 'Helvetica-Bold',
    color:      colors.black,
  },
  jobDate: {
    fontSize:   9,
    color:      colors.gray,
    fontFamily: 'Helvetica-Oblique',
  },
  companyName: {
    fontSize:     10,
    color:        colors.darkGray,
    marginBottom: 4,
  },

  // ── PROJECTS ─────────────────────────────────────────────
  projectBlock: {
    marginBottom: 8,
  },
  projectHeader: {
    flexDirection: 'row',
    alignItems:    'baseline',
    marginBottom:  2,
    gap:           6,
  },
  projectTitle: {
    fontSize:   10.5,
    fontFamily: 'Helvetica-Bold',
    color:      colors.black,
  },
  projectMeta: {
    fontSize:   9,
    color:      colors.gray,
    fontFamily: 'Helvetica-Oblique',
  },
  projectDate: {
    fontSize:   9,
    color:      colors.gray,
    fontFamily: 'Helvetica-Oblique',
  },

  // ── SKILLS (Category: List) ──────────────────────────────
  skillRow: {
    flexDirection: 'row',
    marginBottom:  3,
  },
  skillCategory: {
    fontSize:   10,
    fontFamily: 'Helvetica-Bold',
    color:      colors.black,
    width:      100,
    flexShrink: 0,
  },
  skillList: {
    flex:       1,
    fontSize:   10,
    color:      colors.darkGray,
    lineHeight: 1.4,
  },

  // ── EDUCATION ────────────────────────────────────────────
  eduBlock: {
    marginBottom: 6,
  },
  eduHeader: {
    flexDirection:  'row',
    justifyContent: 'space-between',
    alignItems:     'baseline',
    marginBottom:   2,
  },
  eduInstitution: {
    fontSize:   10.5,
    fontFamily: 'Helvetica-Bold',
    color:      colors.black,
  },
  eduDate: {
    fontSize:   9,
    color:      colors.gray,
    fontFamily: 'Helvetica-Oblique',
  },
  eduDegree: {
    fontSize:     10,
    color:        colors.darkGray,
    fontFamily:   'Helvetica-Oblique',
    marginBottom: 1,
  },
  eduLocation: {
    fontSize: 9,
    color:    colors.gray,
  },

  // ── CERTIFICATIONS ──────────────────────────────────────
  certItem: {
    marginBottom: 3,
  },
  certText: {
    fontSize: 10,
    color:    colors.darkGray,
  },
  certLink: {
    fontSize:        9,
    color:           '#0066CC',
    textDecoration:  'underline',
    marginLeft:      4,
  },
});

// ── REUSABLE COMPONENTS ──────────────────────────────────────────────────

function SectionHeader({ title }) {
  return (
    <>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={styles.divider} />
    </>
  );
}

function BulletItem({ text }) {
  return (
    <View style={styles.bulletItem}>
      <Text style={styles.bulletSymbol}>•</Text>
      <Text style={styles.bulletText}>{String(text || '')}</Text>
    </View>
  );
}

// ── MAIN DOCUMENT ─────────────────────────────────────────────────────────

export const CVDocument = ({ data, profile }) => {
  if (!data || !profile) {
    return (
      <Document>
        <Page size="A4" style={styles.page}>
          <Text style={styles.name}>ERROR: MISSING DATA</Text>
        </Page>
      </Document>
    );
  }

  const contactInfo = data.contactInfo || {};
  const experiences = data.experiences || [];
  const education = data.education || [];
  const hardSkills = data.hardSkills || [];
  const softSkills = data.softSkills || [];

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        
        {/* ── HEADER: NAME & CONTACT ────────────────────────── */}
        <Text style={styles.name}>
          {String(contactInfo.fullName || profile?.full_name || '').toUpperCase()}
        </Text>
        
        {contactInfo.location && (
          <Text style={styles.location}>{String(contactInfo.location)}</Text>
        )}
        
        <View style={styles.contactRow}>
          {contactInfo.phone && (
            <Text style={styles.contactText}>{String(contactInfo.phone)}</Text>
          )}
          {contactInfo.phone && contactInfo.email && (
            <Text style={styles.contactDivider}>•</Text>
          )}
          {contactInfo.email && (
            <Text style={styles.contactText}>{String(contactInfo.email)}</Text>
          )}
          {contactInfo.email && contactInfo.linkedin && (
            <Text style={styles.contactDivider}>•</Text>
          )}
          {contactInfo.linkedin && (
            <Text style={styles.contactText}>{String(contactInfo.linkedin)}</Text>
          )}
          {contactInfo.linkedin && contactInfo.portfolio && (
            <Text style={styles.contactDivider}>•</Text>
          )}
          {contactInfo.portfolio && (
            <Text style={styles.contactText}>{String(contactInfo.portfolio)}</Text>
          )}
        </View>

        {/* ── PROFILE SUMMARY (ATS: Recognized as summary) ──── */}
        {data.summary && (
          <>
            <SectionHeader title="Profile Summary" />
            {data.summaryBullets && Array.isArray(data.summaryBullets) ? (
              data.summaryBullets.map((bullet, i) => (
                <BulletItem key={i} text={bullet} />
              ))
            ) : (
              <Text style={styles.bulletText}>{String(data.summary)}</Text>
            )}
          </>
        )}

        {/* ── RELEVANT COURSEWORK (if exists) ─────────────────── */}
        {data.coursework && data.coursework.length > 0 && (
          <>
            <SectionHeader title="Relevant Coursework" />
            <View style={styles.twoColumnRow}>
              {data.coursework.map((course, i) => (
                <View key={i} style={styles.courseItem}>
                  <Text style={styles.courseBullet}>•</Text>
                  <Text style={styles.courseText}>{String(course)}</Text>
                </View>
              ))}
            </View>
          </>
        )}

        {/* ── EXPERIENCE (ATS: "Professional Experience" or "Work History") ── */}
        {experiences.length > 0 && (
          <>
            <SectionHeader title="Experience" />
            {experiences.map((exp, i) => (
              <View key={i} style={styles.jobBlock}>
                <View style={styles.jobHeader}>
                  <Text style={styles.jobTitle}>{String(exp.role || '')}</Text>
                  <Text style={styles.jobDate}>
                    {String(exp.startDate || '')} – {String(exp.endDate || 'Present')}
                  </Text>
                </View>
                <Text style={styles.companyName}>{String(exp.company || '')}</Text>
                {exp.bullets && exp.bullets.map((bullet, bi) => (
                  <BulletItem key={bi} text={bullet} />
                ))}
              </View>
            ))}
          </>
        )}

        {/* ── PROJECTS (if exists) ───────────────────────────── */}
        {data.projects && data.projects.length > 0 && (
          <>
            <SectionHeader title="Projects" />
            {data.projects.map((proj, i) => (
              <View key={i} style={styles.projectBlock}>
                <View style={styles.projectHeader}>
                  <Text style={styles.projectTitle}>{String(proj.name || '')}</Text>
                  {proj.tech && (
                    <Text style={styles.projectMeta}>| {String(proj.tech)}</Text>
                  )}
                  {proj.link && (
                    <Text style={styles.projectMeta}>| {String(proj.link)}</Text>
                  )}
                  {proj.date && (
                    <Text style={styles.projectDate}>{String(proj.date)}</Text>
                  )}
                </View>
                {proj.bullets && proj.bullets.map((bullet, bi) => (
                  <BulletItem key={bi} text={bullet} />
                ))}
              </View>
            ))}
          </>
        )}

        {/* ── TECHNICAL SKILLS (ATS-Friendly Format) ────────── */}
        {hardSkills.length > 0 && (
          <>
            <SectionHeader title="Technical Skills" />
            <View style={styles.skillRow}>
              <Text style={styles.skillCategory}>Analytical Tools:</Text>
              <Text style={styles.skillList}>{hardSkills.join(', ')}</Text>
            </View>
          </>
        )}

        {/* ── EDUCATION (ATS: Must be labeled "Education") ───── */}
        {education.length > 0 && (
          <>
            <SectionHeader title="Education" />
            {education.map((edu, i) => (
              <View key={i} style={styles.eduBlock}>
                <View style={styles.eduHeader}>
                  <Text style={styles.eduInstitution}>{String(edu.institution || '')}</Text>
                  <Text style={styles.eduDate}>
                    {String(edu.startDate || '')} – {String(edu.endDate || 'Present')}
                  </Text>
                </View>
                <Text style={styles.eduDegree}>
                  {String(edu.degree || '')} - CGPA: {String(edu.gpa || 'N/A')}
                </Text>
                {edu.location && (
                  <Text style={styles.eduLocation}>{String(edu.location)}</Text>
                )}
              </View>
            ))}
          </>
        )}

        {/* ── CERTIFICATIONS (if exists) ───────────────────── */}
        {data.certifications && data.certifications.length > 0 && (
          <>
            <SectionHeader title="Extracurricular / Certifications" />
            {data.certifications.map((cert, i) => (
              <View key={i} style={styles.certItem}>
                <Text style={styles.certText}>
                  • {String(cert.name || '')}
                  {cert.link && (
                    <Text style={styles.certLink}> View Credentials</Text>
                  )}
                </Text>
              </View>
            ))}
          </>
        )}

      </Page>
    </Document>
  );
};