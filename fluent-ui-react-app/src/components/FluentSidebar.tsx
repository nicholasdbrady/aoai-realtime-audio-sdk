import React, { useState } from 'react';
import {
    Button,
    mergeClasses,
    makeStyles,
    shorthands,
    tokens,
    Dialog,
    DialogTrigger,
    DialogSurface,
    DialogBody,
    DialogTitle,
    DialogContent,
    DialogActions,
    Input,
    Field,
    Toast,
    ToastTitle,
    useToastController
} from '@fluentui/react-components';
import {
    Home24Regular,
    Info24Regular,
    AppsListDetail24Regular,
    ContactCard24Regular,
    Navigation24Regular,
    PlugConnected24Regular,
    Checkmark24Regular
} from '@fluentui/react-icons';

const useStyles = makeStyles({
    sidebar: {
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: tokens.colorNeutralBackground1,
        boxShadow: tokens.shadow4,
        height: '100vh',
        transition: 'width 0.2s ease-in-out',
        position: 'fixed',
        top: '48px', // Adjust based on your header height
        left: 0,
        zIndex: 99,
    },
    expanded: {
        width: '200px',
    },
    collapsed: {
        width: '56px',
    },
    navButton: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        textAlign: 'left',
        height: '48px',
        ...shorthands.margin('4px', '0'),
    },
    buttonText: {
        marginLeft: '8px',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
    },
    toggleButton: {
        alignSelf: 'center',
        ...shorthands.margin('8px', '0'),
    },
    hidden: {
        display: 'none',
    },
    spacer: {
        flexGrow: 1,
    }
});

const FluentSidebar: React.FC = () => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [endpoint, setEndpoint] = useState('');
    const [apiKey, setApiKey] = useState('');
    const [isConnected, setIsConnected] = useState(false);
    const { dispatchToast } = useToastController();
    const styles = useStyles();

    const toggleSidebar = () => {
        setIsExpanded(!isExpanded);
    };

    const handleConnect = () => {
        if (!endpoint || !apiKey) {
            dispatchToast(
                <Toast>
                    <ToastTitle>Please provide both endpoint and API key</ToastTitle>
                </Toast>,
                { intent: 'error' }
            );
            return false;
        }

        // Connection logic would go here
        // For demo purposes, we'll just simulate success
        setIsConnected(true);
        dispatchToast(
            <Toast>
                <ToastTitle>Successfully connected to Azure OpenAI</ToastTitle>
            </Toast>,
            { intent: 'success' }
        );
        return true;
    };

    return (
        <div className={mergeClasses(styles.sidebar, isExpanded ? styles.expanded : styles.collapsed)}>
            {/* Hamburger menu at the top */}
            <Button
                icon={<Navigation24Regular />}
                appearance="subtle"
                onClick={toggleSidebar}
                className={mergeClasses(styles.navButton, styles.toggleButton)}
                title={isExpanded ? "Collapse sidebar" : "Expand sidebar"}
            />
            
            <Button 
                icon={<Home24Regular />}
                appearance="subtle"
                className={styles.navButton}
            >
                <span className={mergeClasses(styles.buttonText, !isExpanded && styles.hidden)}>
                    Home
                </span>
            </Button>
            <Button 
                icon={<Info24Regular />}
                appearance="subtle"
                className={styles.navButton}
            >
                <span className={mergeClasses(styles.buttonText, !isExpanded && styles.hidden)}>
                    About
                </span>
            </Button>
            <Button 
                icon={<AppsListDetail24Regular />}
                appearance="subtle"
                className={styles.navButton}
            >
                <span className={mergeClasses(styles.buttonText, !isExpanded && styles.hidden)}>
                    Services
                </span>
            </Button>
            <Button 
                icon={<ContactCard24Regular />}
                appearance="subtle"
                className={styles.navButton}
            >
                <span className={mergeClasses(styles.buttonText, !isExpanded && styles.hidden)}>
                    Contact
                </span>
            </Button>
            
            {/* Spacer to push connect button to bottom */}
            <div className={styles.spacer}></div>
            
            {/* Connect button at the bottom */}
            <Dialog>
                <DialogTrigger disableButtonEnhancement>
                    <Button 
                        appearance="subtle" 
                        icon={isConnected ? <Checkmark24Regular /> : <PlugConnected24Regular />}
                        className={styles.navButton}
                    >
                        <span className={mergeClasses(styles.buttonText, !isExpanded && styles.hidden)}>
                            {isConnected ? 'Connected' : 'Connect'}
                        </span>
                    </Button>
                </DialogTrigger>
                <DialogSurface>
                    <DialogBody>
                        <DialogTitle>Connect to Azure OpenAI</DialogTitle>
                        <DialogContent>
                            <Field label="Endpoint URL" required>
                                <Input
                                    placeholder="https://your-resource.openai.azure.com/"
                                    value={endpoint}
                                    onChange={(e, data) => setEndpoint(data.value)}
                                />
                            </Field>
                            <Field label="API Key" required>
                                <Input
                                    type="password"
                                    placeholder="Enter your API key"
                                    value={apiKey}
                                    onChange={(e, data) => setApiKey(data.value)}
                                />
                            </Field>
                        </DialogContent>
                        <DialogActions>
                            <DialogTrigger disableButtonEnhancement>
                                <Button appearance="secondary">Cancel</Button>
                            </DialogTrigger>
                            <DialogTrigger disableButtonEnhancement>
                                <Button appearance="primary" onClick={handleConnect}>Connect</Button>
                            </DialogTrigger>
                        </DialogActions>
                    </DialogBody>
                </DialogSurface>
            </Dialog>
        </div>
    );
};

export default FluentSidebar;