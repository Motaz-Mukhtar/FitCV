// import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

// const colors = {
//   navy: '#1a1a2e',
//   teal: '#6b9e9e',
//   tealLight: '#d8e8e8',
//   tealSection: '#c5d8d8',
//   gray: '#444444',
//   lightGray: '#777777',
//   white: '#ffffff',
//   black: '#111111',
// };

// const styles = StyleSheet.create({
//   page: {
//     paddingTop: 36,
//     paddingBottom: 36,
//     paddingHorizontal: 44,
//     fontFamily: 'Helvetica',
//     fontSize: 9.5,
//     color: colors.black,
//     backgroundColor: colors.white,
//   },

//   // ── HEADER ──────────────────────────────────────────────
//   headerName: {
//     fontSize: 26,
//     fontFamily: 'Helvetica-Bold',
//     color: colors.navy,
//     letterSpacing: 1,
//     marginBottom: 5,
//   },
//   contactRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 14,
//     marginBottom: 8,
//     backgroundColor: colors.tealLight,
//     paddingVertical: 5,
//     paddingHorizontal: 8,
//   },
//   contactItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 3,
//   },
//   contactIcon: {
//     fontSize: 8,
//     color: colors.teal,
//   },
//   contactText: {
//     fontSize: 8.5,
//     color: colors.gray,
//   },

//   // ── TITLE BAR ─────────────────────────────────────────
//   titleBar: {
//     backgroundColor: colors.teal,
//     paddingVertical: 6,
//     marginBottom: 10,
//     alignItems: 'center',
//   },
//   titleText: {
//     fontFamily: 'Helvetica-Bold',
//     fontSize: 11,
//     color: colors.white,
//     letterSpacing: 3,
//     textTransform: 'uppercase',
//   },

//   // ── SECTION ───────────────────────────────────────────
//   sectionHeader: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: colors.tealSection,
//     paddingVertical: 4,
//     paddingHorizontal: 6,
//     marginBottom: 7,
//     marginTop: 10,
//   },
//   sectionSquare: {
//     width: 7,
//     height: 7,
//     backgroundColor: colors.teal,
//     marginRight: 7,
//   },
//   sectionTitle: {
//     fontFamily: 'Helvetica-Bold',
//     fontSize: 9,
//     letterSpacing: 2,
//     color: colors.navy,
//     textTransform: 'uppercase',
//   },

//   // ── SUMMARY ───────────────────────────────────────────
//   summaryText: {
//     lineHeight: 1.55,
//     color: colors.gray,
//     marginBottom: 8,
//     fontSize: 9.5,
//   },

//   // ── EXPERIENCE ────────────────────────────────────────
//   expBlock: {
//     marginBottom: 9,
//   },
//   expTopRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'baseline',
//     marginBottom: 1,
//   },
//   expRoleDate: {
//     flexDirection: 'row',
//     alignItems: 'baseline',
//     gap: 5,
//     flex: 1,
//   },
//   expRole: {
//     fontFamily: 'Helvetica-Bold',
//     fontSize: 10,
//     color: colors.black,
//   },
//   expDot: {
//     fontSize: 9,
//     color: colors.lightGray,
//   },
//   expDate: {
//     fontSize: 8.5,
//     color: colors.lightGray,
//     fontStyle: 'italic',
//   },
//   expCompanyLocation: {
//     fontSize: 8.5,
//     color: colors.gray,
//     fontFamily: 'Helvetica-Oblique',
//     textAlign: 'right',
//     flex: 0,
//   },
//   bulletList: {
//     marginTop: 3,
//     marginLeft: 4,
//   },
//   bulletRow: {
//     flexDirection: 'row',
//     marginBottom: 2,
//     alignItems: 'flex-start',
//   },
//   bulletSquare: {
//     width: 5,
//     height: 5,
//     backgroundColor: colors.teal,
//     marginRight: 6,
//     marginTop: 2.5,
//     flexShrink: 0,
//   },
//   bulletText: {
//     flex: 1,
//     lineHeight: 1.45,
//     color: colors.gray,
//     fontSize: 9.2,
//   },

//   // ── EDUCATION ─────────────────────────────────────────
//   eduBlock: {
//     marginBottom: 7,
//   },
//   eduDegree: {
//     fontFamily: 'Helvetica-Bold',
//     fontSize: 9.5,
//     color: colors.black,
//     marginBottom: 1,
//   },
//   eduMeta: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 5,
//   },
//   eduInstitution: {
//     fontSize: 9,
//     color: colors.gray,
//   },
//   eduDot: {
//     fontSize: 9,
//     color: colors.teal,
//   },
//   eduDate: {
//     fontSize: 9,
//     color: colors.lightGray,
//   },

//   // ── SKILLS ────────────────────────────────────────────
//   skillsGrid: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     gap: 0,
//   },
//   skillsColumns: {
//     flexDirection: 'row',
//     gap: 20,
//   },
//   skillColumn: {
//     flex: 1,
//   },
//   skillRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 4,
//   },
//   skillSquare: {
//     width: 5,
//     height: 5,
//     backgroundColor: colors.teal,
//     marginRight: 7,
//     flexShrink: 0,
//   },
//   skillText: {
//     fontSize: 9.5,
//     color: colors.gray,
//     fontFamily: 'Helvetica-Bold',
//   },
// });

// // ── HELPERS ─────────────────────────────────────────────

// function SectionHeader({ title }) {
//   return (
//     <View style={styles.sectionHeader}>
//       <View style={styles.sectionSquare} />
//       <Text style={styles.sectionTitle}>{title}</Text>
//     </View>
//   );
// }

// function BulletItem({ text }) {
//   return (
//     <View style={styles.bulletRow}>
//       <View style={styles.bulletSquare} />
//       <Text style={styles.bulletText}>{text}</Text>
//     </View>
//   );
// }

// function SkillItem({ text }) {
//   return (
//     <View style={styles.skillRow}>
//       <View style={styles.skillSquare} />
//       <Text style={styles.skillText}>{text}</Text>
//     </View>
//   );
// }

// // Split array into two roughly equal columns
// function splitColumns(arr) {
//   const mid = Math.ceil(arr.length / 2);
//   return [arr.slice(0, mid), arr.slice(mid)];
// }

// // ── MAIN COMPONENT ──────────────────────────────────────

// export const CVDocument = ({ data, profile }) => {
//   const allSkills = [
//     ...(data.hardSkills || []),
//     ...(data.softSkills || []),
//   ];
//   const [col1, col2] = splitColumns(allSkills);

//   const contactInfo = data.contactInfo || {};

//   return (
//     <Document>
//       <Page size="A4" style={styles.page}>

//         {/* ── NAME ── */}
//         <Text style={styles.headerName}>
//           {(contactInfo.fullName || profile?.name || '').toUpperCase()}
//         </Text>

//         {/* ── CONTACT ROW ── */}
//         <View style={styles.contactRow}>
//           {contactInfo.location && (
//             <View style={styles.contactItem}>
//               <Text style={styles.contactIcon}>⌂</Text>
//               <Text style={styles.contactText}>{contactInfo.location}</Text>
//             </View>
//           )}
//           {contactInfo.phone && (
//             <View style={styles.contactItem}>
//               <Text style={styles.contactIcon}>✆</Text>
//               <Text style={styles.contactText}>{contactInfo.phone}</Text>
//             </View>
//           )}
//           {contactInfo.email && (
//             <View style={styles.contactItem}>
//               <Text style={styles.contactIcon}>✉</Text>
//               <Text style={styles.contactText}>{contactInfo.email}</Text>
//             </View>
//           )}
//           {contactInfo.linkedin && (
//             <View style={styles.contactItem}>
//               <Text style={styles.contactIcon}>in</Text>
//               <Text style={styles.contactText}>{contactInfo.linkedin}</Text>
//             </View>
//           )}
//         </View>

//         {/* ── JOB TITLE BAR ── */}
//         <View style={styles.titleBar}>
//           <Text style={styles.titleText}>
//             {data.title || profile?.title || ''}
//           </Text>
//         </View>

//         {/* ── QUALIFICATIONS PROFILE / SUMMARY ── */}
//         <SectionHeader title="Qualifications Profile" />
//         <Text style={styles.summaryText}>{data.summary}</Text>

//         {/* ── PROFESSIONAL EXPERIENCE ── */}
//         <SectionHeader title="Professional Experience" />
//         {(data.experiences || []).map((exp, i) => (
//           <View key={i} style={styles.expBlock}>
//             <View style={styles.expTopRow}>
//               <View style={styles.expRoleDate}>
//                 <Text style={styles.expRole}>{exp.role}</Text>
//                 <Text style={styles.expDot}>•</Text>
//                 <Text style={styles.expDate}>
//                   {exp.startDate}–{exp.endDate || 'Present'}
//                 </Text>
//                 <Text style={styles.expCompanyLocation}>{exp.company}</Text>
//               </View>
//             </View>
//             <View style={styles.bulletList}>
//               {(exp.bullets || []).map((b, bi) => (
//                 <BulletItem key={bi} text={b} />
//               ))}
//             </View>
//           </View>
//         ))}

//         {/* ── EDUCATION AND CREDENTIALS ── */}
//         {data.education && data.education.length > 0 && (
//           <View>
//             <SectionHeader title="Education and Credentials" />
//             {data.education.map((edu, i) => (
//               <View key={i} style={styles.eduBlock}>
//                 <Text style={styles.eduDegree}>
//                   {edu.degree} in {edu.field},{' '}
//                   <Text style={{ fontFamily: 'Helvetica', fontWeight: 'normal' }}>
//                     {edu.endDate || edu.startDate}
//                   </Text>
//                 </Text>
//                 <View style={styles.eduMeta}>
//                   <Text style={styles.eduInstitution}>{edu.institution}</Text>
//                   {edu.location && (
//                     <>
//                       <Text style={styles.eduDot}>•</Text>
//                       <Text style={styles.eduDate}>{edu.location}</Text>
//                     </>
//                   )}
//                 </View>
//               </View>
//             ))}
//           </View>
//         )}

//         {/* ── SKILLS ── */}
//         {allSkills.length > 0 && (
//           <View>
//             <SectionHeader title="Technical Skills" />
//             <View style={styles.skillsColumns}>
//               <View style={styles.skillColumn}>
//                 {col1.map((skill, i) => (
//                   <SkillItem key={i} text={skill} />
//                 ))}
//               </View>
//               <View style={styles.skillColumn}>
//                 {col2.map((skill, i) => (
//                   <SkillItem key={i} text={skill} />
//                 ))}
//               </View>
//             </View>
//           </View>
//         )}

//       </Page>
//     </Document>
//   );
// };


import { Document, Page, Text, View, StyleSheet, Svg, Path, G, Circle } from '@react-pdf/renderer';

// ─── PALETTE ────────────────────────────────────────────────────────────────
const colors = {
  navy:        '#1a1a2e',
  teal:        '#6b9e9e',
  tealLight:   '#d8e8e8',
  tealSection: '#c5d8d8',
  gray:        '#444444',
  lightGray:   '#777777',
  white:       '#ffffff',
  black:       '#111111',
};

// ─── STYLES ─────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  page: {
    paddingTop:        36,
    paddingBottom:     36,
    paddingHorizontal: 44,
    fontFamily:        'Helvetica',
    fontSize:          9.5,
    color:             colors.black,
    backgroundColor:   colors.white,
  },

  // ── HEADER ──────────────────────────────────────────────
  headerName: {
    fontSize:      26,
    fontFamily:    'Helvetica-Bold',
    color:         colors.navy,
    letterSpacing: 1,
    marginBottom:  5,
  },

  // ── CONTACT ROW ─────────────────────────────────────────
  contactRow: {
    flexDirection:     'row',
    alignItems:        'center',
    gap:               14,
    marginBottom:      8,
    backgroundColor:   colors.tealLight,
    paddingVertical:   5,
    paddingHorizontal: 8,
    flexWrap:          'wrap',
  },
  contactItem: {
    flexDirection: 'row',
    alignItems:    'center',
    gap:           4,
  },
  contactText: {
    fontSize: 8.5,
    color:    colors.gray,
  },

  // ── TITLE BAR ───────────────────────────────────────────
  titleBar: {
    backgroundColor: colors.teal,
    paddingVertical: 6,
    marginBottom:    10,
    alignItems:      'center',
  },
  titleText: {
    fontFamily:    'Helvetica-Bold',
    fontSize:      11,
    color:         colors.white,
    letterSpacing: 3,
  },

  // ── SECTION HEADER ──────────────────────────────────────
  sectionHeader: {
    flexDirection:     'row',
    alignItems:        'center',
    backgroundColor:   colors.tealSection,
    paddingVertical:   4,
    paddingHorizontal: 6,
    marginBottom:      7,
    marginTop:         10,
  },
  sectionSquare: {
    width:           7,
    height:          7,
    backgroundColor: colors.teal,
    marginRight:     7,
  },
  sectionTitle: {
    fontFamily:    'Helvetica-Bold',
    fontSize:      9,
    letterSpacing: 2,
    color:         colors.navy,
  },

  // ── SUMMARY ─────────────────────────────────────────────
  summaryText: {
    lineHeight:   1.55,
    color:        colors.gray,
    marginBottom: 8,
    fontSize:     9.5,
  },

  // ── EXPERIENCE ──────────────────────────────────────────
  expBlock: {
    marginBottom: 9,
  },
  // FIX: role+date on first line, company on second line — prevents wrapping
  expFirstLine: {
    flexDirection: 'row',
    alignItems:    'baseline',
    gap:           5,
    marginBottom:  1,
  },
  expRole: {
    fontFamily: 'Helvetica-Bold',
    fontSize:   10,
    color:      colors.black,
    flexShrink: 0,
  },
  expDot: {
    fontSize:   9,
    color:      colors.lightGray,
    flexShrink: 0,
  },
  expDate: {
    fontSize:   8.5,
    color:      colors.lightGray,
    fontFamily: 'Helvetica-Oblique',
    flexShrink: 0,
  },
  // Company on its own line — no more wrapping fight
  expCompany: {
    fontSize:   8.8,
    color:      colors.teal,
    fontFamily: 'Helvetica-Oblique',
    marginBottom: 2,
  },
  bulletList: {
    marginTop:  3,
    marginLeft: 4,
  },
  bulletRow: {
    flexDirection: 'row',
    marginBottom:  2,
    alignItems:    'flex-start',
  },
  bulletSquare: {
    width:           5,
    height:          5,
    backgroundColor: colors.teal,
    marginRight:     6,
    marginTop:       2.5,
    flexShrink:      0,
  },
  bulletText: {
    flex:       1,
    lineHeight: 1.45,
    color:      colors.gray,
    fontSize:   9.2,
  },

  // ── EDUCATION ───────────────────────────────────────────
  eduBlock: {
    marginBottom: 7,
  },
  eduDegree: {
    fontFamily:   'Helvetica-Bold',
    fontSize:     9.5,
    color:        colors.black,
    marginBottom: 1,
  },
  eduMeta: {
    flexDirection: 'row',
    alignItems:    'center',
    gap:           5,
  },
  eduInstitution: {
    fontSize: 9,
    color:    colors.gray,
  },
  eduDot: {
    fontSize: 9,
    color:    colors.teal,
  },
  eduDate: {
    fontSize: 9,
    color:    colors.lightGray,
  },

  // ── SKILLS ──────────────────────────────────────────────
  skillsColumns: {
    flexDirection: 'row',
    gap:           20,
  },
  skillColumn: {
    flex: 1,
  },
  skillRow: {
    flexDirection: 'row',
    alignItems:    'center',
    marginBottom:  4,
  },
  skillSquare: {
    width:           5,
    height:          5,
    backgroundColor: colors.teal,
    marginRight:     7,
    flexShrink:      0,
  },
  skillText: {
    fontSize:   9.5,
    color:      colors.gray,
    fontFamily: 'Helvetica-Bold',
  },
});

// ─── SVG ICONS (white, 10×10) ────────────────────────────────────────────────
// Each renders a clean white icon at a consistent size

function IconPhone() {
  return (
    <Svg width="9" height="9" viewBox="0 0 24 24">
      <Path
        fill={colors.teal}
        d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z"
      />
    </Svg>
  );
}

function IconEmail() {
  return (
    <Svg width="9" height="9" viewBox="0 0 24 24">
      <Path
        fill={colors.teal}
        d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"
      />
    </Svg>
  );
}

function IconLocation() {
  return (
    <Svg width="9" height="9" viewBox="0 0 24 24">
      <Path
        fill={colors.teal}
        d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"
      />
    </Svg>
  );
}

function IconLinkedIn() {
  return (
    <Svg width="9" height="9" viewBox="0 0 24 24">
      <Path
        fill={colors.teal}
        d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"
      />
    </Svg>
  );
}

// ─── REUSABLE COMPONENTS ─────────────────────────────────────────────────────

function SectionHeader({ title }) {
  return (
    <View style={styles.sectionHeader}>
      <View style={styles.sectionSquare} />
      <Text style={styles.sectionTitle}>{title.toUpperCase()}</Text>
    </View>
  );
}

function BulletItem({ text }) {
  return (
    <View style={styles.bulletRow}>
      <View style={styles.bulletSquare} />
      <Text style={styles.bulletText}>{String(text || '')}</Text>
    </View>
  );
}

function SkillItem({ text }) {
  return (
    <View style={styles.skillRow}>
      <View style={styles.skillSquare} />
      <Text style={styles.skillText}>{String(text || '')}</Text>
    </View>
  );
}

function splitColumns(arr) {
  const mid = Math.ceil(arr.length / 2);
  return [arr.slice(0, mid), arr.slice(mid)];
}

// ─── MAIN DOCUMENT ───────────────────────────────────────────────────────────

export const CVDocument = ({ data, profile }) => {
  // Defensive validation - ensure data and profile exist
  if (!data || !profile) {
    return (
      <Document>
        <Page size="A4" style={styles.page}>
          <Text style={styles.headerName}>ERROR: MISSING DATA</Text>
        </Page>
      </Document>
    )
  }

  const contactInfo = data.contactInfo || {};

  // FIX: keep hard and soft skills SEPARATE — do not merge them
  const [hardCol1, hardCol2] = splitColumns(data.hardSkills || []);
  const [softCol1, softCol2] = splitColumns(data.softSkills || []);

  return (
    <Document>
      <Page size="A4" style={styles.page}>

        {/* ── NAME ── */}
        <Text style={styles.headerName}>
          {String(contactInfo.fullName || profile?.name || '').toUpperCase()}
        </Text>

        {/* ── CONTACT ROW ── */}
        <View style={styles.contactRow}>
          {contactInfo.location && String(contactInfo.location) && (
            <View style={styles.contactItem}>
              <IconLocation />
              <Text style={styles.contactText}>{String(contactInfo.location)}</Text>
            </View>
          )}
          {contactInfo.phone && String(contactInfo.phone) && (
            <View style={styles.contactItem}>
              <IconPhone />
              <Text style={styles.contactText}>{String(contactInfo.phone)}</Text>
            </View>
          )}
          {contactInfo.email && String(contactInfo.email) && (
            <View style={styles.contactItem}>
              <IconEmail />
              <Text style={styles.contactText}>{String(contactInfo.email)}</Text>
            </View>
          )}
          {contactInfo.linkedin && String(contactInfo.linkedin) && (
            <View style={styles.contactItem}>
              <IconLinkedIn />
              <Text style={styles.contactText}>{String(contactInfo.linkedin)}</Text>
            </View>
          )}
        </View>

        {/* ── TITLE BAR ── */}
        <View style={styles.titleBar}>
          <Text style={styles.titleText}>
            {String(data.title || profile?.title || '').toUpperCase()}
          </Text>
        </View>

        {/* ── PROFESSIONAL SUMMARY ── */}
        <SectionHeader title="Profile / Summary" />
        <Text style={styles.summaryText}>{String(data.summary || '')}</Text>

        {/* ── PROFESSIONAL EXPERIENCE ── */}
        <SectionHeader title="Work Experience" />
        {(data.experiences || []).map((exp, i) => {
          // Ensure exp has all required fields
          if (!exp || !exp.role) return null;
          
          return (
            <View key={i} style={styles.expBlock}>
              {/* FIX: role • date on one line, company underneath — no wrapping */}
              <View style={styles.expFirstLine}>
                <Text style={styles.expRole}>{String(exp.role || '')}</Text>
                <Text style={styles.expDot}>•</Text>
                <Text style={styles.expDate}>
                  {String(exp.startDate || '')} – {String(exp.endDate || 'Present')}
                </Text>
              </View>
              <Text style={styles.expCompany}>{String(exp.company || '')}</Text>

              <View style={styles.bulletList}>
                {(exp.bullets || []).map((b, bi) => (
                  <BulletItem key={bi} text={String(b || '')} />
                ))}
              </View>
            </View>
          )
        })}

        {/* ── EDUCATION AND CREDENTIALS ── */}
        {data.education && data.education.length > 0 && (
          <View>
            <SectionHeader title="Education and Credentials" />
            {data.education.map((edu, i) => {
              // Ensure edu has required fields
              if (!edu || !edu.degree) return null;
              
              return (
                <View key={i} style={styles.eduBlock}>
                  <Text style={styles.eduDegree}>
                    {String(edu.degree || '')} in {String(edu.field || 'N/A')},{' '}
                    <Text style={{ fontFamily: 'Helvetica' }}>
                      {String(edu.endDate || edu.startDate || '')}
                    </Text>
                  </Text>
                  <View style={styles.eduMeta}>
                    <Text style={styles.eduInstitution}>{String(edu.institution || '')}</Text>
                    {edu.location && String(edu.location) && (
                      <>
                        <Text style={styles.eduDot}>•</Text>
                        <Text style={styles.eduDate}>{String(edu.location)}</Text>
                      </>
                    )}
                  </View>
                </View>
              )
            })}
          </View>
        )}

        {/* ── TECHNICAL SKILLS ── */}
        {data.hardSkills && data.hardSkills.length > 0 && (
          <View>
            <SectionHeader title="Technical Skills" />
            <View style={styles.skillsColumns}>
              <View style={styles.skillColumn}>
                {hardCol1.map((skill, i) => <SkillItem key={i} text={skill} />)}
              </View>
              <View style={styles.skillColumn}>
                {hardCol2.map((skill, i) => <SkillItem key={i} text={skill} />)}
              </View>
            </View>
          </View>
        )}

        {/* ── SOFT SKILLS ── */}
        {data.softSkills && data.softSkills.length > 0 && (
          <View>
            <SectionHeader title="Soft Skills" />
            <View style={styles.skillsColumns}>
              <View style={styles.skillColumn}>
                {softCol1.map((skill, i) => <SkillItem key={i} text={skill} />)}
              </View>
              <View style={styles.skillColumn}>
                {softCol2.map((skill, i) => <SkillItem key={i} text={skill} />)}
              </View>
            </View>
          </View>
        )}

      </Page>
    </Document>
  );
};