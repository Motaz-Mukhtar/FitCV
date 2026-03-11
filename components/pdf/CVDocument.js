import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer';

// Register a cleaner font if needed, or use standard ones
// Standard fonts: Helvetica, Times-Roman, Courier

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: 'Helvetica',
    fontSize: 10,
    color: '#000926', // deep-navy
  },
  header: {
    marginBottom: 20,
    borderBottomWidth: 2,
    borderBottomColor: '#0F52BA', // sapphire
    paddingBottom: 10,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#000926',
  },
  title: {
    fontSize: 14,
    color: '#0F52BA',
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 8,
    color: '#0F52BA',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  summary: {
    lineHeight: 1.5,
    marginBottom: 10,
  },
  experienceItem: {
    marginBottom: 12,
  },
  expHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 2,
  },
  expRole: {
    fontWeight: 'bold',
    fontSize: 11,
  },
  expCompany: {
    fontStyle: 'italic',
    color: '#333',
  },
  expDate: {
    fontSize: 9,
    color: '#666',
  },
  bulletList: {
    marginTop: 4,
    marginLeft: 10,
  },
  bullet: {
    flexDirection: 'row',
    marginBottom: 2,
  },
  bulletPoint: {
    width: 10,
    fontSize: 10,
  },
  bulletText: {
    flex: 1,
    lineHeight: 1.4,
  },
  skillsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 5,
  },
  skillTag: {
    backgroundColor: '#D6E6F3', // ice-blue
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 4,
    fontSize: 9,
  }
});

export const CVDocument = ({ data, profile }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.name}>{profile.name}</Text>
        <Text style={styles.title}>{data.role || profile.title}</Text>
      </View>

      {/* Summary */}
      <View>
        <Text style={styles.sectionTitle}>Professional Summary</Text>
        <Text style={styles.summary}>{data.summary}</Text>
      </View>

      {/* Experience */}
      <View>
        <Text style={styles.sectionTitle}>Work Experience</Text>
        {data.experiences?.map((exp, i) => (
          <View key={i} style={styles.experienceItem}>
            <View style={styles.expHeader}>
              <Text style={styles.expRole}>{exp.role}</Text>
              <Text style={styles.expDate}>{exp.startDate} - {exp.endDate || 'Present'}</Text>
            </View>
            <Text style={styles.expCompany}>{exp.company}</Text>
            <View style={styles.bulletList}>
              {exp.bullets?.map((bullet, bi) => (
                <View key={bi} style={styles.bullet}>
                  <Text style={styles.bulletPoint}>•</Text>
                  <Text style={styles.bulletText}>{bullet}</Text>
                </View>
              ))}
            </View>
          </View>
        ))}
      </View>

      {/* Skills */}
      <View>
        <Text style={styles.sectionTitle}>Technical Skills</Text>
        <View style={styles.skillsGrid}>
          {data.hardSkills?.map((skill, i) => (
            <Text key={i} style={styles.skillTag}>{skill}</Text>
          ))}
        </View>
      </View>

      {/* Soft Skills */}
      {data.softSkills && data.softSkills.length > 0 && (
        <View>
          <Text style={styles.sectionTitle}>Soft Skills</Text>
          <View style={styles.skillsGrid}>
            {data.softSkills.map((skill, i) => (
              <Text key={i} style={styles.skillTag}>{skill}</Text>
            ))}
          </View>
        </View>
      )}
    </Page>
  </Document>
);
