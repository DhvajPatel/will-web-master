/**
 * A simple footer component that inherits most styles and adapts to the app's theme.
 */
import { Typography, useTheme, Box } from "@mui/material";
import { format } from 'date-fns';

const Footer = () => {
    const currentYear = new Date().getFullYear();
    const theme = useTheme();

    const buildInfo = {
        version: __APP_VERSION__,
        commitHash: __GIT_COMMIT_HASH__,
        commitDate: __GIT_COMMIT_DATE__,
        buildTime: format(new Date(__BUILD_TIME__), 'PPpp')
    };

    return (
        <footer style={{ 
            backgroundColor: theme.palette.primary.main, 
            color: theme.palette.primary.contrastText,
            marginTop: 'auto'
        }}>
            <Box sx={{ 
                maxWidth: '1200px', 
                margin: '0 auto', 
                padding: '0 1rem',
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: 2
            }}>
                <Typography variant="body2">
                    © {currentYear} Param Ichha. All rights reserved.
                </Typography>
                
                <Box sx={{ 
                    display: 'flex', 
                    gap: 2,
                    flexWrap: 'wrap',
                    justifyContent: 'center'
                }}>
                    <Typography variant="caption" sx={{ opacity: 0.8 }}>
                        Built: {buildInfo.buildTime}
                    </Typography>
                    
                    <Typography variant="caption" sx={{ opacity: 0.8 }}>
                        v{buildInfo.version} ({buildInfo.commitHash})
                    </Typography>
                    
                    <Typography variant="caption" sx={{ opacity: 0.8 }}>
                        Commit: {buildInfo.commitDate}
                    </Typography>
                </Box>
            </Box>
        </footer>
    );
};

export default Footer;