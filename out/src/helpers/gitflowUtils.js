'use strict';
var gitUtils = require('../helpers/gitUtils');
function startFeature(rootDir, featureName) {
    return gitUtils.getGitPath().then(function (gitExecutable) {
        return new Promise(function (resolve, reject) {
            var options = { cwd: rootDir };
            var spawn = require('child_process').spawn;
            var ls = spawn(gitExecutable, ['flow', 'feature', 'start', featureName], options);
            var log = '';
            var error = '';
            ls.stdout.on('data', function (data) {
                log += data + '\n';
            });
            ls.stderr.on('data', function (data) {
                error += data;
            });
            ls.on('exit', function (code) {
                if (code > 0) {
                    reject(error);
                    return;
                }
                var message = log;
                if (code === 0 && error.length > 0)
                    message += '\n\n' + error;
                resolve(message);
            });
        });
    });
}
exports.startFeature = startFeature;
function finishFeature(rootDir) {
    return gitUtils.getGitPath().then(function (gitExecutable) {
        return new Promise(function (resolve, reject) {
            var options = { cwd: rootDir };
            var spawn = require('child_process').spawn;
            var ls1 = spawn(gitExecutable, ['flow', 'feature', 'list'], options);
            var branchData = '';
            var features = [];
            var inFeature = false;
            var currentBranch = '';
            ls1.stdout.on('data', function (data) {
                branchData += data;
            });
            ls1.on('exit', function (data) {
                features = branchData.replace(/ /g, '').trim().split('\n');
                features.forEach(function (element) {
                    if (element.indexOf('*') === 0) {
                        inFeature = true;
                        currentBranch = element.substring(1);
                        return;
                    }
                });
                if (!inFeature) {
                    reject('Not currently on a Feature branch');
                    return;
                }
                var ls2 = spawn(gitExecutable, ['flow', 'feature', 'finish', currentBranch], options);
                var log = '';
                var error = '';
                ls2.stdout.on('data', function (data) {
                    log += data + '\n';
                });
                ls2.stderr.on('data', function (data) {
                    error += data;
                });
                ls2.on('exit', function (code) {
                    if (code > 0) {
                        reject(error);
                        return;
                    }
                    var message = log;
                    if (code === 0 && error.length > 0)
                        message += '\n\n' + error;
                    resolve(message);
                });
            });
        });
    });
}
exports.finishFeature = finishFeature;
function startRelease(rootDir, releaseName) {
    return gitUtils.getGitPath().then(function (gitExecutable) {
        return new Promise(function (resolve, reject) {
            var options = { cwd: rootDir };
            var spawn = require('child_process').spawn;
            var ls = spawn(gitExecutable, ['flow', 'release', 'start', releaseName], options);
            var log = '';
            var error = '';
            ls.stdout.on('data', function (data) {
                log += data + '\n';
            });
            ls.stderr.on('data', function (data) {
                error += data;
            });
            ls.on('exit', function (code) {
                if (code > 0) {
                    reject(error);
                    return;
                }
                var message = log;
                if (code === 0 && error.length > 0)
                    message += '\n\n' + error;
                resolve(message);
            });
        });
    });
}
exports.startRelease = startRelease;
function finishRelease(rootDir) {
    return gitUtils.getGitPath().then(function (gitExecutable) {
        return new Promise(function (resolve, reject) {
            var options = { cwd: rootDir };
            var spawn = require('child_process').spawn;
            var ls1 = spawn(gitExecutable, ['flow', 'release', 'list'], options);
            var branchData = '';
            var releases = [];
            var inRelease = false;
            var currentBranch = '';
            ls1.stdout.on('data', function (data) {
                branchData += data;
            });
            ls1.on('exit', function (data) {
                releases = branchData.replace(/ /g, '').trim().split('\n');
                releases.forEach(function (element) {
                    if (element.indexOf('*') === 0) {
                        inRelease = true;
                        currentBranch = element.substring(1);
                        return;
                    }
                });
                if (!inRelease) {
                    reject('Not currently on a Release branch');
                    return;
                }
                var ls2 = spawn(gitExecutable, ['flow', 'release', 'finish', currentBranch], options);
                var log = '';
                var error = '';
                ls2.stdout.on('data', function (data) {
                    log += data + '\n';
                });
                ls2.stderr.on('data', function (data) {
                    error += data;
                });
                ls2.on('exit', function (code) {
                    if (code > 0) {
                        reject(error);
                        return;
                    }
                    var message = log;
                    if (code === 0 && error.length > 0)
                        message += '\n\n' + error;
                    resolve(message);
                });
            });
        });
    });
}
exports.finishRelease = finishRelease;
function startHotfix(rootDir, hotfixName) {
    return gitUtils.getGitPath().then(function (gitExecutable) {
        return new Promise(function (resolve, reject) {
            var options = { cwd: rootDir };
            var spawn = require('child_process').spawn;
            var ls = spawn(gitExecutable, ['flow', 'hotfix', 'start', hotfixName], options);
            var log = '';
            var error = '';
            ls.stdout.on('data', function (data) {
                log += data + '\n';
            });
            ls.stderr.on('data', function (data) {
                error += data;
            });
            ls.on('exit', function (code) {
                if (code > 0) {
                    reject(error);
                    return;
                }
                var message = log;
                if (code === 0 && error.length > 0)
                    message += '\n\n' + error;
                resolve(message);
            });
        });
    });
}
exports.startHotfix = startHotfix;
function finishHotfix(rootDir) {
    return gitUtils.getGitPath().then(function (gitExecutable) {
        return new Promise(function (resolve, reject) {
            var options = { cwd: rootDir };
            var spawn = require('child_process').spawn;
            var ls1 = spawn(gitExecutable, ['flow', 'hotfix', 'list'], options);
            var branchData = '';
            var hotfixes = [];
            var inHotfix = false;
            var currentBranch = '';
            ls1.stdout.on('data', function (data) {
                branchData += data;
            });
            ls1.on('exit', function (data) {
                hotfixes = branchData.replace(/ /g, '').trim().split('\n');
                hotfixes.forEach(function (element) {
                    if (element.indexOf('*') === 0) {
                        inHotfix = true;
                        currentBranch = element.substring(1);
                        return;
                    }
                });
                if (!inHotfix) {
                    reject('Not currently on a Hotfix branch');
                    return;
                }
                var ls2 = spawn(gitExecutable, ['flow', 'hotfix', 'finish', currentBranch], options);
                var log = '';
                var error = '';
                ls2.stdout.on('data', function (data) {
                    log += data + '\n';
                });
                ls2.stderr.on('data', function (data) {
                    error += data;
                });
                ls2.on('exit', function (code) {
                    if (code > 0) {
                        reject(error);
                        return;
                    }
                    var message = log;
                    if (code === 0 && error.length > 0)
                        message += '\n\n' + error;
                    resolve(message);
                });
            });
        });
    });
}
exports.finishHotfix = finishHotfix;
//# sourceMappingURL=gitflowUtils.js.map