import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: 'Helvetica',
    fontSize: 11,
  },
  header: {
    fontSize: 24,
    marginBottom: 10,
    fontFamily: 'Helvetica-Bold',
  },
  section: {
    marginBottom: 10,
  },
  text: {
    marginBottom: 5,
  },
});

export const CVDocumentSimple = ({ data, profile }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.header}>
          {data?.contactInfo?.fullName || 'Name'}
        </Text>
        
        <View style={styles.section}>
          <Text style={styles.text}>
            {data?.contactInfo?.email || ''}
          </Text>
          <Text style={styles.text}>
            {data?.contactInfo?.phone || ''}
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.text}>
            {data?.title || ''}
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.text}>
            {data?.summary || ''}
          </Text>
        </View>
      </Page>
    </Document>
  );
};
