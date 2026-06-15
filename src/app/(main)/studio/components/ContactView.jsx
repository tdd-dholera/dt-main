// schemas/components/ContactView.jsx
import { Card, Flex, Stack, Text } from '@sanity/ui'

export const ContactView = ({document}) => {
  const {displayed} = document
  
  return (
    <Card padding={4} radius={2} shadow={1}>
      <Stack space={4}>
        <Card padding={3} radius={2} tone="primary">
          <Text size={2} weight="bold">
            Contact Details
          </Text>
          <Flex direction="column" gap={3} marginTop={3}>
            <Text>From: {displayed.name}</Text>
            <Text>Email: {displayed.email}</Text>
            <Text>Subject: {displayed.subject}</Text>
          </Flex>
        </Card>
        
        <Card padding={3} radius={2} tone={getStatusTone(displayed.status)}>
          <Text size={2} weight="bold">
            Status: {displayed.status}
          </Text>
          <Text size={1} muted>
            Last Updated: {new Date(displayed.statusUpdateDate).toLocaleString()}
          </Text>
        </Card>
        
        <Card padding={3} radius={2}>
          <Text size={2} weight="bold">
            Message
          </Text>
          <Text style={{whiteSpace: 'pre-wrap'}} marginTop={3}>
            {displayed.message}
          </Text>
        </Card>
      </Stack>
    </Card>
  )
}

function getStatusTone(status) {
  switch(status) {
    case 'pending':
      return 'caution'
    case 'in-review':
      return 'primary'
    case 'processing':
      return 'positive'
    case 'completed':
      return 'success'
    case 'archived':
      return 'critical'
    default:
      return 'default'
  }
}