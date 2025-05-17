
export const containerBox = {
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
}

export const authPaper = {
    padding: 4,
    width: '100%',
    maxWidth: 400,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    backdropFilter: 'blur(12px)',
}

export const titleText = {
    color: '#6a4c93',
    fontWeight: 'bold',
    mb: 3
}

export const submitButton = {
    mt: 2,
    borderRadius: 30,
    padding: '0.75rem',
    backgroundColor: '#6a4c93',
    '&:hover': {
        backgroundColor: '#553175',
        transform: 'scale(1.05)',
    },
    transition: 'transform 0.2s ease-in-out',
}