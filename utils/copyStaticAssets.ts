import * as shell from 'shelljs';

shell.rm('-rf', 'build');
shell.mkdir('-p', 'build/src/public');
shell.mkdir('-p', 'build/src/views');
shell.cp('-R', 'src/public', 'build/src/public');
shell.cp('-R', 'src/views', 'build/src/views');
