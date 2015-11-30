module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        aws: grunt.file.readJSON("site/config/local-aws-credentials.json"),

        s3: {
          options: {
            accessKeyId: "<%= aws.accessKeyId %>",
            secretAccessKey: "<%= aws.secretAccessKey %>",
            bucket: "kinglet-internal"
          },
          build: {
            //cwd: "build",
            src: 'builds/<%= build_name %>.tgz'
          }
        },

        sass: {
            dev: {
                files: [
                    {
                        expand: true,
                        cwd: 'site/public/sass',
                        src: ['*.scss', '*.sass'],
                        dest: 'site/public/css',
                        ext: '.css'
                    },
                ],
            },
            build: {
                options: {
                    sourcemap: 'none',
                    style: 'compressed'
                },
                files: [
                    {
                        expand: true,
                        cwd: 'site/public/sass',
                        src: ['*.scss', '*.sass'],
                        dest: 'builds/<%= build_name %>/site/public/css',
                        ext: '.css'
                    }
                ]
            }
        },

        jshint: {
            grunt: {
                src: 'Gruntfile.js'
            },
            app: {
                src: [
                    'site/server.js',
                    'site/app_modules/*.js',
                    'site/node_modules/*.js'
                ],
                options: {
                    curly: true,
                    latedef: true,
                    undef: true,
                    unused: 'vars',
                    laxbreak: true,
                    loopfunc: true,
                    node: true
                }
            },
            web: {
                src: [
                    'site/public/js/kinglet.js',
                    'site/public/js/location_edit.js',
                    'site/public/js/map_search.js',
                    'site/public/js/funding.js',
                    'site/public/js/insider.js',
                    'site/public/js/about_us.js'
                ],
                options: {
                    curly: true,
                    latedef: 'nofunc',
                    undef: true,
                    unused: 'vars',
                    laxbreak: true,
                    loopfunc: true,
                    es3: true,
                    browser: true,
                    devel: true,
                    globals: {
                        $: false,
                        google: false,
                        Kinglet: false
                    },
                },
            },
        },

        watch: {
            sass: {
                files: ['**/*.sass', '**/*.scss'],
                tasks: ['sass']
            }
        },

        mkdir: {
            build: {
                options: {
                    create: ['builds/<%= build_name %>/site/public/file']
                }
            }
        },

        copy: {
            build: {
                src: [
                    'package.json',
                    'site/app_modules/**',
                    'site/node_modules/**',
                    'site/public/**',
                    '!site/public/css/*.map',
                    '!site/public/sass/**',
                    '!site/public/file/**',
                    'site/views/**',
                    'site/server.js',
                    'site/insider-config.js',
                    'site/aggregate_daily.js',
                    'site/daily_report.js',
                    'site/config/*.js',
                    '!site/config/local*.*',
                    '!site/config/test.js'
                ],
                dest: 'builds/<%= build_name %>',
                expand: true
            }
        },

        clean: {
            all: {
                src: ['builds/**']
            },
            build: {
                src: ['builds/<%= build_name %>']
            }
        },

        deps: {
            build: {
                options: {
                    cwd: 'builds/<%= build_name %>',
                    production: true
                }
            }
        },

        uglify: {
            build: {
                options: {
                    mangle: true
                },
                files: [{
                    expand: true,
                    cwd: 'builds/<%= build_name %>/site/public',
                    src: [
                        'js/*.js',
                        '!js/*.min.js',
                        'js/**/*.js',
                        '!js/**/*.min.js',
                        'boots/script/*.js',
                        '!boots/script/*.min.js',
                        'boots/script/**/*.js',
                        '!boots/script/**/*.min.js'
                    ],
                    dest: 'builds/<%= build_name %>/site/public',
                    ext: '.min.js'
                }]
            }
        },

        compress: {
            build: {
                options: {
                    'mode': 'tgz',
                    'archive': 'builds/<%= build_name %>.tgz'
                },
                files: [{
                    expand: true,
                    cwd: 'builds',
                    src: ['<%= build_name %>/**']
                }]
            }
        },
			
				uncss: {
					dist: {
						files: {
							'site/public/css/framework.css': ['site/views/boots/index.html', 'site/views/boots/index_first_time.html', 'site/views/_post_blog.html', 'site/views/_post_success.html', 'site/views/_post_video.html', 'site/views/blog-pagination.html', 'site/views/boots/blog-previews.html', 'site/views/boots/page.html', 'site/views/post.html', 'site/views/rss.html', 'site/views/tag.html', 'site/views/boots/admin/desk_request_check.html', 'site/views/boots/admin/index.html', 'site/views/boots/admin/request_service_manage.html', 'site/views/boots/admin/stats.html', 'site/views/boots/admin/stats2.html', 'site/views/boots/admin/test_hello.html', 'site/views/boots/admin/test_tour.html', 'site/views/boots/admin/test.html', 'site/views/boots/admin/track.html',
																								
'site/views/boots/common/_pager.html', 'site/views/boots/common/child_new.html', 'site/views/boots/common/info_message.html', 'site/views/boots/common/object_all.html', 'site/views/boots/common/object_edit.html', 'site/views/boots/common/object_list.html', 'site/views/boots/common/object_manage.html', 'site/views/boots/common/object_new.html', 'site/views/boots/common/object_page_entry.html', 'site/views/boots/common/object_reports.html', 'site/views/boots/common/object_view.html',
																							 
'site/views/boots/desk/desk_detail.html', 'site/views/boots/desk/desk_request.html', 'site/views/boots/desk/desk_search_listview.html', 'site/views/boots/desk/desk_search_mapview.html', 'site/views/boots/desk/desk_search_result.html', 'site/views/boots/desk/desk_search.html', 'site/views/boots/desk/filter.html', 'site/views/boots/desk/map_search_filter.html', 'site/views/boots/desk/report_agg_daily_postal_type.html', 
																								
'site/views/boots/file/detail.html', 'site/views/boots/file/view.html',
																							 
'site/views/boots/guides/_alexandria1.html', 'site/views/boots/guides/_baltdowntown1.html', 'site/views/boots/guides/_bethesda1.html', 'site/views/boots/guides/_canton1.html', 'site/views/boots/guides/_capitolhill1.html', 'site/views/boots/guides/_dcdowntown1.html', 'site/views/boots/guides/_dupontcircle1.html', 'site/views/boots/guides/_federalhill1.html', 'site/views/boots/guides/_georgetown1.html', 'site/views/boots/guides/_hampden1.html', 'site/views/boots/guides/_locustpoint1.html', 'site/views/boots/guides/_mtvernon1.html', 'site/views/boots/guides/_southbalt1.html', 'site/views/boots/guides/baltimore.html', 'site/views/boots/guides/dc.html', 'site/views/boots/guides/index.html', 'site/views/boots/guides/neighborhood.html',
																							 
'site/views/boots/hello/guest.html', 'site/views/boots/hello/host.html',
																							 
'site/views/boots/insider/odoe-1.html', 'site/views/boots/insider/odoe-2.html',
																							 
'site/views/boots/layout/_google_analytics.html', 'site/views/boots/layout/admin_layout.html','site/views/boots/layout/bare_layout.html', 'site/views/boots/layout/base.html', 'site/views/boots/layout/design_layout.html',
																							 
'site/views/boots/license/_licenses.html', 'site/views/boots/license/report_active_licenses.html', 'site/views/boots/license/report_inactive_licenses.html',
																							 
'site/views/boots/location/desk_detail.html', 'site/views/boots/location/inquire.html','site/views/boots/location/location_detail.html','site/views/boots/location/location_edit.html', 'site/views/boots/location/request01.html', 'site/views/boots/location/request02.html', 'site/views/boots/location/request03.html', 'site/views/boots/location/request04.html', 'site/views/boots/location/tour_business.html', 'site/views/boots/location/tour_confirm.html', 'site/views/boots/location/tour_known.html','site/views/boots/location/tour_schedule.html','site/views/boots/location/tour.html',
																							 
'site/views/boots/neighborhoods/baltdowntown.html','site/views/boots/neighborhoods/baltimore.html','site/views/boots/neighborhoods/capitolhill.html','site/views/boots/neighborhoods/dc.html','site/views/boots/neighborhoods/dcdowntown.html','site/views/boots/neighborhoods/georgetown.html','site/views/boots/neighborhoods/index.html', 'site/views/boots/neighborhoods/mtvernon.html', 'site/views/boots/neighborhoods/neighborhood_template.html','site/views/boots/neighborhoods/southbalt.html',
																							 
'site/views/boots/pages/index.html','site/views/boots/pages/success.html',
																							 
'site/views/boots/referral/_featured_rewards.html', 'site/views/boots/referral/_pixels.html','site/views/boots/referral/_signin.html', 'site/views/boots/referral/_signup.html', 'site/views/boots/referral/_steps.html','site/views/boots/referral/index.html','site/views/boots/referral/invite.html','site/views/boots/referral/referree.html','site/views/boots/referral/reward.html','site/views/boots/referral/signup.html',
																							 
'site/views/boots/request/license_agreement_231_e_baltimore.html','site/views/boots/request/license_agreement_carr.html','site/views/boots/request/license_agreement_cop.html','site/views/boots/request/license_agreement.html','site/views/boots/request/no_payout.html','site/views/boots/request/nofund.html','site/views/boots/request/request_detail.html','site/views/boots/request/request_reserve.html','site/views/boots/request/verify.html',
																							 
'site/views/boots/tour/tour_detail.html',
																							 
'site/views/boots/user/detail.html','site/views/boots/user/external_login.html','site/views/boots/user/login_form.html','site/views/boots/user/login.html','site/views/boots/user/password_change.html','site/views/boots/user/password_reset.html','site/views/boots/user/profile.html','site/views/boots/user/promo_newbus2015.html','site/views/boots/user/promo_np5.html','site/views/boots/user/promo_signup2014.html','site/views/boots/user/signup_form.html','site/views/boots/user/signup_thanks.html','site/views/boots/user/signup.html',
																							 
'site/views/boots/web/404.html','site/views/boots/web/500.html','site/views/boots/web/about-us.html','site/views/boots/web/balitmore.html','site/views/boots/web/careers.html','site/views/boots/web/host-instructions.html','site/views/boots/web/how-it-works.html','site/views/boots/web/license_agreement.html', 'site/views/boots/web/privacy.html','site/views/boots/web/referral-terms.html','site/views/boots/web/team-alex.html','site/views/boots/web/team-charlie.html','site/views/boots/web/team-ej.html','site/views/boots/web/team-jeff.html','site/views/boots/web/team-mike.html','site/views/boots/web/team.html','site/views/boots/web/terms.html']
						}
					}
				}
    });

    // Create standardize build name using package name and version
    //grunt.config('build_name',grunt.config('pkg.name') + '_' + grunt.config('pkg.version'));
    // Use epoch time for the build name
    //grunt.config('build_name',grunt.config('pkg.name') + '_' + Date.now());
    // Use date and time for the build name
    grunt.config('build_name',grunt.config('pkg.name') + '_' + grunt.template.today("yyyymmdd_HHMMss"));
	
		// Grunt Un-CSS Task - Ran using grunt uncss
		grunt.loadNpmTasks('grunt-uncss');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-compress');
    grunt.loadNpmTasks('grunt-aws');
    grunt.loadNpmTasks('grunt-mkdir');

    grunt.registerTask('dev', 'Run development tasks', ['jshint', 'sass:dev']);

    grunt.registerMultiTask('deps', 'Install NPM dependencies', function() {
        var spawn = require('child_process').spawn;
        var next = this.async();

        var options = this.options({
            production: false
        });

        var args = ['install'];

        if (options.production) {
            args.push('--production');
        }

        var cp = spawn('npm', args, {cwd: options.cwd, stdio: 'ignore'});

        cp.on('error', grunt.warn);

        cp.on('close', function (code) {
            if (code === 0) {
                grunt.log.ok('Node.js dependencies installed.');
            } else {
                grunt.warn('Exited with error code ' + code);
            }

            next();
        });

    });

    grunt.registerTask('build', 'Build project for production deployment', [
        'clean:build', 'copy:build', 'mkdir:build', 'deps:build', 'sass:build',
        'uglify:build', 'compress:build', 's3:build'
    ]);

    grunt.registerTask('default', ['dev']);
};
