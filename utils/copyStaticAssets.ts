import * as shell from 'shelljs';

shell.rm('-rf', 'build');
shell.mkdir('-p', 'build/public');
shell.mkdir('-p', 'build/views');
shell.cp('-R', 'public', 'build');
shell.cp('-R', 'views', 'build');
